import express from 'express'
	import productCtrl from '../controllers/products.controller.js' 
	const router = express.Router()

	router.route('/api/products') 
	.get(productCtrl.list)
	.post(productCtrl.create)
	.delete(productCtrl.removeAllProducts)
	
	router.route('/api/product/:productId') 
	.get(productCtrl.read)
	.put(productCtrl.update) 
	.delete(productCtrl.removeOne)

	router.param('productId', productCtrl.productByID)
	router.route('/api/products').post(productCtrl.create) 
	router.route('/api/products').get(productCtrl.list)
	router.route('/api/products').delete(productCtrl.removeAllProducts)
	router.param('productId', productCtrl.productByID)
	router.route('/api/products/:productId').get(productCtrl.read)
	router.route('/api/products/:productId').put(productCtrl.update)
	router.route('/api/products/:productId').delete(productCtrl.removeOne)
	
	


	export default router
