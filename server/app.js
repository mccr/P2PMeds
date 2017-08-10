require('dotenv').config();
const express      = require('express');
const path         = require('path');
const favicon      = require('serve-favicon');
const logger       = require('morgan');
const layouts      = require('express-ejs-layouts');
const cookieParser = require('cookie-parser');
const bodyParser   = require('body-parser');
const mongoose     = require('mongoose');
const session      = require('express-session');
const MongoStore   = require('connect-mongo')(session);
const passport = require("passport");
const cors = require('cors');
const debug = require('debug')(`server:${path.basename(__filename)}`);
const dbURL = process.env.MONGO_URL;

mongoose.connect(dbURL)
.then(() => debug('connected to DB'))
.catch(err => debug(err));

const app = express();

const whitelist = [
    'http://localhost:4200',
];
const corsOptions = {
    origin: function(origin, callback){
        var originIsWhitelisted = whitelist.indexOf(origin) !== -1;
        callback(null, originIsWhitelisted);
    },
    credentials: true
};
app.use(cors(corsOptions));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use(session({
  secret: "P2PMeds",
  resave: true,
  saveUninitialized: true,
  store: new MongoStore({ mongooseConnection: mongoose.connection })
}));
app.use(passport.initialize());
app.use(passport.session());

require('./api/passport/config');

//require('./routes')(app);
app.use('/api/', require('./api/passport/authLocal'));
app.use('/api/rating', require('./api/Rating/RatingRoutes'));
app.use('/api/route', require('./api/Route/RouteRoutes'));
app.use('/api/petition', require('./api/SendEvent/SendEventRoutes'));
app.use('/api/user', require('./api/User/UserRoutes'));
app.use('/api/airports', require('./api/Airports/airportRoutes'));

app.use(function(req, res) {
  res.sendfile(__dirname + '/public/index.html');
});

// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
