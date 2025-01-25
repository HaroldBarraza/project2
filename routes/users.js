const express = require('express');
const router = express.Router()
const userController = require('../controller/users')

router.get('/', userController.getAllUsers)
router.get('/:id', userController.getSingleUsers)
router.post('/', userController.createUser)
router.put('/:id', userController.updateUser)
router.delete('/:id', userController.deleteUser)

module.exports = router 