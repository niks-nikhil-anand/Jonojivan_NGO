const mongoose = require('mongoose');
const { Schema } = mongoose;

// Define the PendingOrder schema
const contactUsSchema = new Schema({
    firstName:{
        type: String
    },
    lastName:{
        type: String
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        match: [/.+\@.+\..+/, 'Please provide a valid email address'],
        unique: true,
        lowercase: true,
        trim: true,
    },
    mobileNumber:{
        type:String
    },
    message:{
        type: String
    },
    
},{
    timestamps: true
});



export default mongoose.models.ContactUs || mongoose.model('ContactUs', contactUsSchema);
