const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const taskCtrl = require('../controllers/task');

router.post('/', auth, taskCtrl.createTask);
router.put('/:id', auth,taskCtrl.updateOneTask);
router.delete('/:id', auth,taskCtrl.deleteOneTask);
router.get('/:id', auth,taskCtrl.getOneTask);
router.get('/', auth,taskCtrl.getAllTasks);

module.exports = router;