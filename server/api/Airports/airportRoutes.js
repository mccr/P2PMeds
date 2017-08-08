const express = require('express');
const router = express.Router();
const veAirports = require('./ve-airports.js').veAirports;
const worldAirports = require('./world-airports.js').worldAirports;

/*
 * GET
 */
router.get('/', (req, res, next)=> {
  res.status(200).json({veAirports: veAirports, worldAirports: worldAirports});
});

module.exports = router;
