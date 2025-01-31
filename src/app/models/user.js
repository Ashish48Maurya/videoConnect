import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
    },
    meetings: [{
        title: {
            type: String,
            required: true
        },
        time: {
            type: Date,
            default: Date.now
        },
        isAllowed:{
            type: Boolean,
            default: false
        },
        email: [{
            type: String,
        }]
    }]
});

export const User = mongoose.models.User || mongoose.model('User', userSchema);