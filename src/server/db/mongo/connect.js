import mongoose from 'mongoose';
import db from '../../../../config/db'
import loadModels from './models'


export default () => {
    // Find the appropriate database to connect to, default to localhost if not found.
    const connect = () => {
        mongoose.connect(db.url, (err) => {
            if (err) {
                console.log(`===>  Error connecting to ${db.url}`);
                console.log(`Reason: ${err}`);
            } else {
                console.log(`===>  Succeeded in connecting to ${db.url}`);
            }
        });
    };
    connect();

    mongoose.connection.on('error', console.log);
    mongoose.connection.on('disconnected', connect);

    loadModels();

};

