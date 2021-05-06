const express = require('express');
const router = express.Router();
const productController = require('../controllers/Products.controller');
const verify = require('../config/verifyToken');

// router.get('/', (req, res) => {
//     res.send('Products page works!');
// });

router.get('/', verify, productController.getAll);
router.post('/', verify, productController.create);
router.put('/update/:id', verify, productController.update);
router.delete('/delete/:id', verify, productController.delete);


module.exports = router;