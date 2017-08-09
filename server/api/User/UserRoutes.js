const express = require('express');
const router = express.Router();
const UserController = require('./UserController.js');
const upload = require('../config/multer');

/*
 * GET
 */
router.get('/:id', UserController.show);

/*
 * PUT
 */
router.post('/:id', upload.single('file'), UserController.update);


module.exports = router;
