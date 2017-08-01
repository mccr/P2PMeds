var express = require('express');
var router = express.Router();
var SendEventController = require('./SendEventController.js');

/*
 * POST
 */
router.post('/', SendEventController.create);

/*
 * PUT
 */
router.put('/:id', SendEventController.update);

module.exports = router;
