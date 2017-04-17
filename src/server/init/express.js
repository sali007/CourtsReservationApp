import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';

export default (app) => {

    app.set('port', (process.env.PORT || 3001));
    app.use(cookieParser());
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: true}))





}