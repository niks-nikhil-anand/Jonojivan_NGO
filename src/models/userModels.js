import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: [true, 'Name is required']
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        match: [/.+\@.+\..+/, 'Please fill a valid email address']
    },
    mobileNumber: {
        type: String,
        required: [true, 'Mobile number is required'],
        match: /^\+91 \d{10}$/,
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        minlength: [6, 'Password must be at least 6 characters long'] 
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    isVerifiedExpires: {
        type: Date,
        default: null
    },
    resetPasswordToken: {
        type: String,
        default: ''
    },
    resetPasswordExpires: {
        type: Date,
        default: null
    },
    profilePic: {
        type: String,
        default: ''
    },
    address: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Address',
    }],
    role: {
        type: String,
        enum: ['User', 'SuperAdmin'],
        default: 'User'
    },
    status: {
        type: String,
        enum: ['Blocked', 'Pending', 'inReview' ,  'Active'],
        default: 'Active'
    },
    isToken:{
        type: String,
    }
} , {
    timestamps: true
});

export default mongoose.models.User || mongoose.model('User', userSchema);
