import React from 'react';
import ReactDOMServer from 'react-dom/server';
import serialize from "serialize-javascript";
import { StaticRouter } from "react-router";
import { matchPath } from "react-router-dom"
import routes from './router';
import App from './src/App';
import cors from "cors";

const favicon = require('serve-favicon');
const express = require('express');
const path = require('path');
const app = express();

app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());

app.get('*', (req, res, next)=>{
    const activeRoute = routes.find(route => matchPath(req.url, route)) || {};
    const promise = activeRoute.fetchData && activeRoute.fetchData() || Promise.resolve();

    promise.then(data => {
        const context = {data}

        const markup = ReactDOMServer.renderToString(
            <StaticRouter location={req.url} context={context}>
                <App/>
            </StaticRouter>
        )
    
        res.send(
        `<!DOCTYPE html>
            <html>
                <body>
                    <div id="root">${markup}</div>
                    <script>
                        window._INITIAL_DATA_ = ${serialize(data)};
                    </script>
                    <script type="text/javascript" src="bundle.js"></script>
                </body>
            </html>
        `
        )
    }).catch(next);

})

app.listen(3000, ()=>console.log('server listen to port 3000'));