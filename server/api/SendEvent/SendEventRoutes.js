var express = require('express');
var router = express.Router();
var SendEventController = require('./SendEventController.js');

/*
 * GET
 */
router.get('/:id', SendEventController.show);

/*
 * POST
 */
router.post('/', SendEventController.create);

/*
 * PUT
 */
router.put('/:id', SendEventController.update);

module.exports = router;
