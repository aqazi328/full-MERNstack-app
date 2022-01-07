import mongoose from 'mongoose';
let Schema = mongoose.Schema;

const bugSchema = new Schema({
    title:{
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength: 3
    },
    description:{
        type: String,
        required: true,
        trim: true,
        minlength: 5
    },
    dueDate:{
        type: Date
    },
    date:{
        type: Date
    },
    assignee:{
        type: String,
        required: true,
        trim: true,
    },
}, {
    timestamps: true,
})

const Bug = mongoose.model('Bug', bugSchema);
export default Bug;