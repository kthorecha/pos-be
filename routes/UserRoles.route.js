const express = require('express');
const router = express.Router();
const userRoleController = require('../controllers/UserRoles.controller');
const verify = require('../config/verifyToken');

router.get('/', verify, userRoleController.getAll);
router.post('/',verify, userRoleController.create);
router.put('/update/:id', verify, userRoleController.update);
router.delete('/delete/:id', verify, userRoleController.delete);


module.exports = router;