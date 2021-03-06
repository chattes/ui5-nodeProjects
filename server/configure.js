var path = require('path'),
    routes = require('./routes'),
    exphbs = require('express-handlebars'),
    express = require('express'),
    bodyParser = require('body-parser'),
    cookieParser = require('cookie-parser'),
    morgan = require('morgan'),
    methodOverride = require('method-override'),
    errorHandler = require('errorHandler'),
    multer = require('multer'),
    passport = require('passport'),
    session = require('express-session'),
    passportConfig = require('./passportConfig')(passport),
    moment = require('moment');

module.exports = function (app) {

    app.use(bodyParser.urlencoded({ 'extended': true }));
    app.use(bodyParser.json());
    app.use(methodOverride());
    app.use(cookieParser('some-secret-value-here'));

    //Passport Setup
    app.use(session({secret:"imgPloadrSessionSecret"}));
    app.use(passport.initialize());
    app.use(passport.session());
    routes(app,passport); //moving the routes to routes folder--> passing te Passport session for authentication

    //app.use('/public/', express.static(path.join(__dirname, '../public')));
    //        app.use(multer({ dest: path.join(__dirname, 'public/upload/') }).single('pic'));

    if ('development' === app.get('env')) {
        app.use(errorHandler());
    }

    app.engine('handlebars', exphbs.create({
        defaultLayout: 'main',
        layoutsDir: app.get('views') + '/layouts',
        partialsDir: [app.get('views') + '/partials'],
        helpers: {
            timeago: function (timestamp) {
                return moment(timestamp).startOf('minute').fromNow();
            },
            cLog:
            function (debugVar) {
                console.log(debugVar);

            }
        }
    }).engine);

    app.set('view engine', 'handlebars')

    return app;
};


