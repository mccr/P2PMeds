const path = require('path');

module.exports = function(app) {
  app.use('/api/', require('../api/passport/authLocal'));
  app.use('/api/rating', require('../api/Rating/RatingRoutes'));
  app.use('/api/route', require('../api/Route/RouteRoutes'));
  app.use('/api/petition', require('../api/SendEvent/SendEventRoutes'));
  app.use('/api/user', require('../api/User/UserRoutes'));

	// catch 404 and forward to Angular
  app.all('/*', function (req, res) {
    res.sendFile(__dirname + '/public/index.html');
  });
};
