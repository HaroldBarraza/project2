const router = require("express").Router();
const classesController = require('../controller/classes');
const { authenticate } = require('../middleware/authenticate');
router.use(authenticate);
router.get('/', classesController.getAllClasses);
router.get('/:id', classesController.getSingleClasses);

router.post('/' , classesController.createClass);
router.put('/:id' , classesController.updateClass);
router.delete('/:id', classesController.deleteClass);

module.exports = router;