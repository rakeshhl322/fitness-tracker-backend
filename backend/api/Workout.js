import express from 'express'
import authenticateToken from './userAuth.js';
import MESSAGES from '../Utils/Constant.js';
import User from '../model/User.js';
import Workout from '../model/Workout.js';


const router = express.Router();

router.post('/add-workouts', authenticateToken, async (req, res) => {
    try {
        console.log('inside add workout ')
        console.log('Request body:', req.body)
        console.log('Request body type:', typeof req.body)
        console.log('Is array:', Array.isArray(req.body))
        
        // Handle array of workouts - add safety check
        let workoutsArray;
        if (Array.isArray(req.body)) {
            workoutsArray = req.body;
        } else if (req.body.workouts && Array.isArray(req.body.workouts)) {
            workoutsArray = req.body.workouts;
        } else {
            return res.status(400).json({ 
                message: "Invalid request format. Expected array of workouts.",
                received: req.body 
            });
        }
        
        const savedWorkouts = [];
        
        for (const workoutItem of workoutsArray) {
            console.log('Processing workout item:', workoutItem)
            
            // Check if workoutItem has the expected structure
            if (!workoutItem || !workoutItem.data) {
                console.log('Invalid workout item structure:', workoutItem)
                continue; // Skip this item
            }
            
            const { workoutType, exercise, userId } = workoutItem.data;
            
            // Check user only once (assuming all workouts are for same user)
            if (savedWorkouts.length === 0) {
                const checkUser = await User.findById(userId);
                console.log(checkUser, 'inside add workout checkuser')
                if (!checkUser) {
                    return res.status(401).json({ message: MESSAGES.UNKNOWN_USER })
                }
            }
            
            let workoutData;
            console.log(workoutType, exercise, 'request data')
            
            if (workoutType === "Cardio") {
                const { duration, distance } = workoutItem.data;
                workoutData = new Workout({
                    userId,
                    workoutType,
                    exercise,
                    duration,
                    distance
                });
                console.log(workoutData, 'inside add workout workout data cardio')
            } else {
                const { numberOfSets } = workoutItem.data;
                workoutData = new Workout({
                    userId,
                    workoutType,
                    exercise,
                    numberOfSets
                });
                console.log(workoutData, 'inside add workout workout data')
            }
            
            const addWorkoutToDB = await workoutData.save();
            console.log(addWorkoutToDB, 'inside add workout addWorkoutToDB ')
            savedWorkouts.push(addWorkoutToDB);
        }

        res.status(200).json({
            message: "Workouts added successfully",
            count: savedWorkouts.length,
            workouts: savedWorkouts
        });
    } catch (error) {
        console.log(error, 'error')
        res.status(500).json({ message: MESSAGES.INTERNAL_SERVER_ERROR, error: error.message })
    }
})


export default router;