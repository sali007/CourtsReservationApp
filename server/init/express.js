import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import  cors  from 'cors';



const session = require('express-session');
const MongoStore = require('connect-mongo')(session);

export default (app) => {

    app.use(cors());
    app.set('port', (process.env.PORT || 3001));
    app.use(cookieParser());
    app.use(session({
        secret: 'lovely secret!',
        resave: false,
        //saveUnitialized: false,
        store: new MongoStore({
            url : "mongodb://nikfed1:1127215@ds147480.mlab.com:47480/notes"
        })
    }))
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: true}));

}