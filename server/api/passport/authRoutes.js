const express    = require("express");
const passport = require("passport");
const FbStrategy = require('passport-facebook').Strategy;
const path = require('path');
const debug = require('debug')('server:'+path.basename(__filename));
const router  = express.Router();


router.get("/facebook", passport.authenticate("facebook", { scope: 'email'}));

router.get("/facebook/callback", passport.authenticate("facebook", {
  successRedirect: "/my-trips",
  failureRedirect: "/"
}));

router.get("/logout", (req, res, next) => {
  req.logout();
  res.redirect('/');
});


module.exports = router;
