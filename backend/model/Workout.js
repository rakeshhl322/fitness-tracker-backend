import mongoose from "mongoose";

const workout = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref:'User',
    },
    workoutType:{
        type:String,
        required: true,
        enum: ['Push', 'Cardio', 'Pull', 'Legs', 'Abs']
    },
     exercise: {
        type: String,
        required: true
    },
    numberOfSets: {
        type: Object,
    },
    duration: {
        type: String,
    },
    distance: {
        type: String,
    },   
    date: {
        type: Date,
        default: Date.now,
        required: true
    }
},{
    timestamps:true
})
workout.index({ userId: 1, date: -1 });

const Workout = mongoose.model("workout",workout)
export default Workout;