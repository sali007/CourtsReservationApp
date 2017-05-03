import express  from 'express';
import { connect }  from './db'
import InitExpress from './init/express';
import InitRoutes from './init/routes';

import passport from 'passport';
import InitPassport from 'init/passport';

const app = express();

connect();

InitPassport();

InitExpress(app);

InitRoutes(app, passport);


app.listen(app.get('port'), () => {
    console.log(`Server listening on: ${app.get('port')}`);
});
