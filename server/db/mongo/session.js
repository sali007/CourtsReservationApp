import session from 'express-session';
import connectMongo from 'connect-mongo';
import db from '../../../config/db'

const MongoStore = connectMongo(session);

export default () =>
   new MongoStore(
       {
           url: db.url,
           autoReconnect: true
       }
   )