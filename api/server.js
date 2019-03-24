const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const jwt = require('./middleware/jwt');
const errorHandler = require('./middleware/error-handler');
const config = require('./config.json');
const router = require('./router');

const app = express();

app.use(bodyParser.urlencoded({
    extended: false
}));

app.use(bodyParser.json());

app.use(cors());

app.use(jwt);

router.configureRoutes(app);

// Handle unhandled errors gracefully
app.use(errorHandler);


const port = config.port || 4000;
const server = app.listen(port, function () {
    console.log('Server listening on port: ' + port);
});