const express= require('express');
const router=express.Router();
const Product= require('../controllers/product_controller.js')
const upload=require('../middlewares/upload.js')

router.post('/product/create',upload.array("products"), Product.createProduct)
router.get('/products', Product.getAllProduct)
router.get('/product/one', Product.getOneProduct)
router.put('/product/update', Product.updateOneProduct)
router.put('/product/image/update/:id',upload.array("products"), Product.updateProductImage)
router.delete('/product/delete', Product.deleteProduct)
router.get('/product/group', Product.getProductCategory)
router.get('/product/image/:id/:filename', Product.getProductImage)

module.exports = router;