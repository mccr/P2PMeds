var express = require('express');
var router = express.Router();
var UserController = require('./UserController.js');


/*
 * GET
 */
router.get('/:id', UserController.show);

/*
 * PUT
 */
router.put('/:id', UserController.update);


module.exports = router;
