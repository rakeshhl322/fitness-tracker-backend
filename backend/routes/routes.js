import express from 'express'
import User from '../api/user.js'
import Workout from '../api/Workout.js'
const router = express.Router();
console.log('inside route')
router.use('/user', User);
router.use('/workout', Workout);

export default router;