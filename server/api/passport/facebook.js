const passport      = require("passport");
const User =  require('../User/UserModel');
const FbStrategy = require('passport-facebook').Strategy;
const path = require('path');
var debug = require('debug')('server:'+path.basename(__filename));

passport.use(new FbStrategy({
  clientID: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET,
  callbackURL: "/facebook/callback",
  profileFields: ['id', 'displayName','photos', 'emails']
}, (accessToken, refreshToken, profile, done) => {
  debug(profile);
  User.findOne({ provider_id: profile.id }, (err, user) => {
    if (err) return done(err);
    if (user) return done(null, user);

    const newUser = new User({
      name: profile.displayName,
      profilePic: profile.photos[0].value,
      email: profile.emails[0].value,
      sendEvent: [],
      rating: [],
      badge: []
    });

    newUser.save((err) => {
      if (err) {
        return done(err);
      }
      debug(newUser);
      done(null, newUser);
    });
  });
}));
