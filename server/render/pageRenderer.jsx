import React from 'react';
import { renderToString } from 'react-dom/server';
import { Provider } from 'react-redux';
import { RouterContext } from 'react-router';
import Helmet from 'react-helmet';
//import staticAssets from './static-assets';

const assetUrl = process.env.NODE_ENV !== 'production' ? 'http://95.85.13.42/' : '/';

const createApp = (store, props) => renderToString(
    <Provider store={store}>
        <RouterContext {...props} />
    </Provider>
);


const buildPage = ({ componentHTML, initialState }) => {
    return `
<head>
  <meta charset="utf-8" />
  <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0">
  <title>Аренда теннисных кортов. “Теннисный клуб Корона</title>
  <link href="/css/sui.css" rel="stylesheet">
  <link rel="stylesheet" href="${assetUrl}public/assets/styles.css">
  <script>
      window._crd_= '';
      window.__INITIAL_STATE__ = ${JSON.stringify(initialState)}
  </script>
</head>

<body>
  <div id="root">${componentHTML}</div>
  <script type="application/javascript" src="${assetUrl}public/assets/bundle.js"></script>
</body>

</html>`;
};

export default (store, props) => {
    const initialState = store.getState();
    const componentHTML = createApp(store, props);
  //  const headAssets = Helmet.renderStatic();
    return buildPage({ componentHTML, initialState, /*headAssets*/ });
};
