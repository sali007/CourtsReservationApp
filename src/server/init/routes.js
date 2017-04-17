import React from 'react';
import * as reducers from '../../reducers';
import { Provider } from 'react-redux';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import promiseMiddleware from '../../middleware/promiseMiddleware';

import ReactDom from 'react-dom/server';
import { match, RouterContext } from 'react-router';
import routes from '../../routes';
import { controllers } from '../db'
import fetchComponentData from '../fetchComponentData';


const userReservationController = controllers && controllers.reservations


const reducer = combineReducers(reducers);
const store = applyMiddleware(promiseMiddleware)(createStore)(reducer);
const initialState = store.getState();
const assetUrl = process.env.NODE_ENV !== 'production' ? 'http://localhost:8050' : '/';


export default (app) => {

    if(userReservationController) {
        app.post('/reservation', userReservationController.getReservations);
        app.post('/addReservation', userReservationController.add)
    } else {
        console.warn('fail to load controller');
    }

    app.get('/', (req, res) => {

        match({ routes: routes, location: req.path }, (error, redirectLocation, props) => {
            if (redirectLocation) {
                res.redirect(301, redirectLocation.pathname + redirectLocation.search);
            }

            if (error) { // Произошла ошибка любого рода
                return res.status(500).send(error.message);
            }

            if (!props) { // мы не определили путь, который бы подошел для URL
                return res.status(404).send('Not found\n');
            }

            const componentHTML = ReactDom.renderToString(
                <Provider store={store}>
                    <RouterContext {...props}/>
                </Provider>
            );

            //res.removeHeader('Content-Encoding');
            /*res.setHeader('Content-Type', 'text/html; charset=windows-1251')
            res.setHeader('X-Foo', 'bar');
            res.writeHead(200, {
                'Content-Lendth': Buffer.byteLength(renderHTML(componentHTML)),
                'Content-Type': 'text/html',
            })*/

            console.log('index Prerepder Result',decodeURI(renderHTML(componentHTML)) )

            //console.log('Response Object', res)
            return res.end(renderHTML(componentHTML));

        })
    });

}

function renderHTML(componentHTML) {
    return `
<head>
  <meta charset="utf-8" />
  <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0">
  <title>Аренда теннисных кортов. Теннисный клуб Корона</title>
  <link href="${assetUrl}/css/sui.css" rel="stylesheet">
  <link rel="stylesheet" href="${assetUrl}/public/assets/styles.css">
  <script>
	  window._secure_vision_='user';
      window._crd_= '';
      window.__INITIAL_STATE__ = ${JSON.stringify(initialState)}
  </script>
</head>

<body>
  <div id="root">${componentHTML}</div>
  <script type="application/javascript" src="${assetUrl}/public/assets/bundle.js"></script>
</body>

</html>
  `;
}