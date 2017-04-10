import mongoose from 'mongoose';

const ReservationsSchema = new mongoose.Schema({
    day: Number,
    month: Number,
    year: Number
});

export default mongoose.model('Reservation', ReservationsSchema);