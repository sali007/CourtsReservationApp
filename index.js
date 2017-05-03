require('babel-core/register');
['.css', '.less', '.sass', '.ttf', '.woff', '.woff2'].forEach((ext) => require.extensions[ext] = () => {});
require('babel-polyfill');
require('server.js');

//pm2 nginx
//export NODE_PATH=./server/ && pm2 start index.js


