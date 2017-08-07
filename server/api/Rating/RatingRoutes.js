var express = require('express');
var router = express.Router();
var RatingController = require('./RatingController.js');


/*
 * GET
 */
router.get('/:id', RatingController.show);

/*
 * POST
 */
router.post('/', RatingController.create);

/*
 * PUT
 */
router.put('/:id', RatingController.update);

/*
 * DELETE
 */
router.delete('/:id', RatingController.remove);

module.exports = router;
