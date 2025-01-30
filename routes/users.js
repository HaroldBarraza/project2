const express = require('express');
const router = express.Router();
const userController = require('../controller/users');
const { authenticate } = require('../middleware/authenticate');

router.get('/', userController.getAllUsers);
router.get('/:id', userController.getSingleUsers);
router.use(authenticate);
router.post('/', authenticate, userController.createUser );
router.put('/:id', authenticate, userController.updateUser );
router.delete('/:id', authenticate, userController.deleteUser );

module.exports = router;