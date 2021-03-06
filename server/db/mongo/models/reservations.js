import mongoose from 'mongoose';

const ReservationsSchema = new mongoose.Schema({
    day: Number,
    month: Number,
    year: Number,
    court: Number,
    reservation: [{
        hour: Number,
        date: String,
        username: String,
        phone: Number,
        summ: Number,
        status: String
    }]
});


export default mongoose.model('Reservation', ReservationsSchema);