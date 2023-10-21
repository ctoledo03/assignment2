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
		try {
			let products = await Product.find().select('name description category price quantity updated created') 
			res.json(products)
		} catch (err) {
			return res.status(400).json( {error: errorHandler.getErrorMessage(err)} )
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

	const remove = async (req, res) => { 
		try {
			let product = req.profile
			let deletedproduct = await product.remove() 
			res.json(deletedproduct) 
		} catch (err) {
			return res.status(400).json( {error: errorHandler.getErrorMessage(err)} )
		} 
	}

	const searchByName = async (req, res) => {
		try {
			const keyword = req.query.name;

			if (!keyword) {
				return res.status(400).json({ error: 'Keyword not provided' });
			}
			  
			let products = Product.find({ name: { $regex: new RegExp(keyword, 'i') } })
			res.json(products)

		} catch (err) {
			return res.status(400).json( {error: errorHandler.getErrorMessage(err)} )
		}
	}
	
	export default { create, productByID, read, list, remove, update, searchByName }
