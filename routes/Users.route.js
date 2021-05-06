const express = require('express');
const router = express.Router();
const userController = require('../controllers/Users.controller');
const verify = require('../config/verifyToken');

router.get('/', verify, userController.getAll);
router.post('/',verify, userController.create);
router.post('/login', userController.login);
router.post('/logout', verify, userController.logout);
router.put('/update/:id', verify, userController.update);
router.delete('/delete/:id', verify, userController.delete);


module.exports = router;