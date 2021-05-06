const express = require('express');
const router = express.Router();
const productCategoryController = require('../controllers/ProductCategory.controller');
const verify = require('../config/verifyToken');

// router.get('/', (req, res) => {
//     res.send('Products page works!');
// });

router.get('/', verify, productCategoryController.getAll);
router.post('/', verify, productCategoryController.create);
router.put('/update/:id', verify, productCategoryController.update);
router.delete('/delete/:id', verify, productCategoryController.delete);


module.exports = router;