import Product from '../models/products.model.js'
	import extend from 'lodash/extend.js'
	import errorHandler from './error.controller.js'

	// Handles creation of new products
	const create = async (req, res) => { 
		const product = new Product(req.body) 
		try {
			await product.save()
			return res.status(200).json({ message:"Successfully created a new product."})
		} catch (err) {
			return res.status(400).json( {error: errorHandler.getErrorMessage(err)} )
		} 
	}

	// Handles the output of data through an api request
	const list = async (req, res) => { 
		const keyword = req.query.name
		
		if (keyword) {
			try {
				const matchingProducts = await Product.find({ name: { $regex: new RegExp(keyword.toLowerCase(), 'i') } });
				res.json(matchingProducts);
			} catch (err) {
				return res.status(400).json({ error: errorHandler.getErrorMessage(err) })
			}
		}
		else {
			try {
				let products = await Product.find().select('name description category price quantity updated created') 
				res.json(products)
			} catch (err) {
				return res.status(400).json( {error: errorHandler.getErrorMessage(err)} )
			} 
		}
	}


	const productByID = async (req, res, next, id) => { 
		try {
			let product = await Product.findById(id) 
			if (!product)
				return res.status(400).json( {error: "Product not found"} )
			req.profile = product 
			next()
		} catch (err) {
			return res.status(400).json( {error: "Could not retrieve product"} ) 
		}
	}

	const read = (req, res) => {
		return res.json(req.profile) 
	}

	const update = async (req, res) => { 
		try {
			let product = req.profile
			product = extend(product, req.body) 
			product.updated = Date.now() 
			res.json(product) 
		} catch (err) {
			return res.status(400).json( {error: errorHandler.getErrorMessage(err)} )
		} 
	}

	const removeOne = async (req, res) => {
		try {
		  const product = req.profile;
		  const deletedProduct = await Product.deleteOne({ _id: product._id })
		  res.json(deletedProduct)
		} catch (err) {
		  return res.status(400).json({ error: errorHandler.getErrorMessage(err) })
		}
	}

	const removeAllProducts = async (req, res) => {
		try {
		  const result = await Product.deleteMany({});
	  
		  if (result.deletedCount > 0) {
			res.json({ message: `Deleted ${result.deletedCount} products` })
		  } else {
			res.json({ message: `No products found to delete` });
		  }
		} catch (err) {
		  return res.status(400).json({ error: errorHandler.getErrorMessage(err) })
		}
	}

	// const searchByKeyword = async (req, res) => {
	// 	try {
	// 	  const keyword = req.query.name.toLowerCase()
	// 	  const matchingProducts = await Product.find({ name: { $regex: new RegExp(keyword, 'i') } });
    // 	  res.json(matchingProducts);
	// 	} catch (err) {
	// 	  return res.status(400).json({ error: errorHandler.getErrorMessage(err) })
	// 	}
	//   }
	
	export default { create, productByID, read, list, update, removeOne, removeAllProducts }
