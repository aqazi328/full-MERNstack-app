import mongoose from 'mongoose';
let Schema = mongoose.Schema;

const userSchema = new Schema({
    username:{
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength: 3
    },
    password:{
        type: String,
        required: true,
        trim: true,
        minlength: 8
    },
    email:{
        type: String,
        required: true,
        trim: true,
        minlength: 10
    },
    admin:{
        type: Boolean,
        required: true
    },
}, {
    timestamps: true,
})

const User = mongoose.model('User', userSchema);
export default User;