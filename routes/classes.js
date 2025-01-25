const express = require('express')
const router = express.Router();
const classesController = require('../controller/classes');

router.get('/', classesController.getAllClasses);
router.get('/:id', classesController.getSingleClasses);
router.post('/' ,classesController.createClass);
router.put('/:id' , classesController.updateClass);
router.delete('/:id' , classesController.deleteClass);

module.exports = router;