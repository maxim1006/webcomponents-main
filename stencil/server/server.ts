import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as routers from './routers';
import * as path from 'path';

const app = express(),
      port = process.env.NODEJS_PORT || 3000,
      root =  '/api/';

const allowCrossDomain = (req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
};



// Add your mock router here
const appRouters = [
    {
        url: 'family',
        middleware: routers.familyRouter
    },
];

app.use(allowCrossDomain);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

appRouters.forEach(router => app.use(root + router.url, router.middleware));

app.listen(port, () => {
    console.log(`Mock server is listening on port ${port}`);
});
