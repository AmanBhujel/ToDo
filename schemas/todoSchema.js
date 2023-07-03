const mongoose = require("mongoose");

const TodoSchema = new mongoose.Schema({
    description: {
        type: String,
        required: true
    },
     status: {
        type: String,
        enum: ['completed', 'pending'],
        default: 'pending'
    },
    createdAt: {
        type: Date}, // Change the type to Date    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
})
const Todo=mongoose.model("Todo",TodoSchema)

module.exports=Todo