import express  from 'express';
import { connect }  from './db'
import InitExpress from './init/express';
import InitRoutes from './init/routes';

const app = express();

connect();

InitExpress(app);

InitRoutes(app);


app.listen(app.get('port'), () => {
    console.log(`Server listening on: ${app.get('port')}`);
});
