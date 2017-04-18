import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
    userName : {
        type: String,
        unique: true,
        required: true,
    },
    password: {
        type: String,
        required: true
    },
    phone: {
        type: String
    }
})

export default mongoose.model('User', UserSchema);