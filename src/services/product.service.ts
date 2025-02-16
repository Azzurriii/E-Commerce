import Brand from '@models/brand.model';
import Category from '@models/category.model';
import Product from '@models/product.model';
import { ICreateProduct, IUpdateProduct, IGetProductQuery, IGetOfferTimerProductQuery } from '@interfaces/product';
import { NotFoundError } from '@handlers/response-handler';
import Review from '@models/review.model';
// create product
const addProduct = async (data: ICreateProduct) => {
	const product = await Product.create(data);
	const { _id: productId, brand, category } = product;
	//update Brand
	await Brand.updateOne({ _id: brand.id }, { $push: { products: productId } });
	//Category Brand
	await Category.updateOne({ _id: category.id }, { $push: { products: productId } });
	return product;
};

// create all product
const addProducts = async (data: ICreateProduct[]) => {
	await Product.deleteMany();
	const products = await Product.insertMany(data);
	for (const product of products) {
		await Brand.findByIdAndUpdate(product.brand, {
			$push: { products: product._id },
		});
		await Category.findByIdAndUpdate(product.category, {
			$push: { products: product._id },
		});
	}
	return products;
};

// get product data
const getProducts = async () => {
	const products = await Product.find({}).populate({
		path: 'reviews',
		model: Review,
		populate: { path: 'userId', select: 'name email imageURL' },
	});
	return products;
};

// get type of product service
const getProductType = async (type: string, query: IGetProductQuery) => {
	let products;
	if (query.new) {
		products = await Product.find({ productType: type })
			.sort({ createdAt: -1 })
			.limit(query.limit)
			.skip(query.skip)
			.populate({
				path: 'reviews',
				model: Review,
				populate: { path: 'userId', select: 'name email imageURL' },
			});
	} else if (query.featured) {
		products = await Product.find({
			productType: type,
			featured: query.featured,
		})
			.populate({
				path: 'reviews',
				model: Review,
				populate: { path: 'userId', select: 'name email imageURL' },
			})
			.limit(query.limit)
			.skip(query.skip);
	} else if (query.topSellers) {
		products = await Product.find({ productType: type })
			.sort({ sellCount: -1 })
			.limit(query.limit)
			.populate({
				path: 'reviews',
				model: Review,
				populate: { path: 'userId', select: 'name email imageURL' },
			});
	} else {
		products = await Product.find({ productType: type })
			.populate({
				path: 'reviews',
				model: Review,
				populate: { path: 'userId', select: 'name email imageURL' },
			})
			.limit(query.limit)
			.skip(query.skip);
	}
	return products;
};

// get offer product service
const getOfferTimerProduct = async (query: IGetOfferTimerProductQuery) => {
	const products = await Product.find({
		productType: query.productType,
		'offerDate.endDate': { $gt: new Date() },
	}).populate({
		path: 'reviews',
		model: Review,
		populate: { path: 'userId', select: 'name email imageURL' },
	});
	return products;
};

// get popular product service by type
const getPopularProductByType = async (type: string, query: IGetProductQuery) => {
	const products = await Product.find({ productType: type })
		.sort({ 'reviews.length': -1 })
		.limit(query.limit)
		.skip(query.skip)
		.populate({
			path: 'reviews',
			model: Review,
			populate: { path: 'userId', select: 'name email imageURL' },
		});
	return products;
};

const getTopRatedProduct = async () => {
	const products = await Product.find({
		reviews: { $exists: true, $ne: [] },
	}).populate<{ reviews: { rating: number }[] }>({
		path: 'reviews',
		model: Review,
		populate: { path: 'userId', select: 'name email imageURL' },
	});

	const topRatedProducts = products.map((product) => {
		const totalRating = product.reviews.reduce((sum, review) => sum + review.rating, 0);
		const averageRating = totalRating / product.reviews.length;

		return {
			...product.toObject(),
			rating: averageRating,
		};
	});

	topRatedProducts.sort((a, b) => b.rating - a.rating);

	return topRatedProducts;
};

// get product data
const getProduct = async (id: string) => {
	const product = await Product.findById(id).populate({
		path: 'reviews',
		model: Review,
		populate: { path: 'userId', select: 'name email imageURL' },
	});
	if (!product) {
		throw new NotFoundError('Product not found');
	}
	return product;
};

// get product data
const getRelatedProduct = async (productId: string) => {
	const currentProduct = await Product.findById(productId).populate<{ category: { name: string } }>({
		path: 'category',
		model: Category,
	});

	const relatedProducts = await Product.find({
		'category.name': currentProduct?.category.name,
		_id: { $ne: productId },
	});
	return relatedProducts;
};

// update a product
const updateProduct = async (id: string, data: IUpdateProduct) => {
	await getProduct(id);
	const product = await Product.findByIdAndUpdate(id, data, { new: true });
	return product;
};

// get Reviews Products
const getReviewsProducts = async () => {
	const result = await Product.find({
		reviews: { $exists: true, $ne: [] },
	}).populate({
		path: 'reviews',
		model: Review,
		populate: { path: 'userId', select: 'name email imageURL' },
	});
	const products = result.filter((p) => p.reviews.length > 0);
	return products;
};

// get Reviews Products
const getStockOutProducts = async () => {
	const result = await Product.find({ status: 'out-of-stock' }).sort({ createdAt: -1 });
	return result;
};

// get Reviews Products
const deleteProduct = async (id: string) => {
	await getProduct(id);
	const result = await Product.deleteOne({ _id: id });
	return result;
};

export default {
	addProduct,
	addProducts,
	getProducts,
	getProductType,
	getOfferTimerProduct,
	getPopularProductByType,
	getTopRatedProduct,
	getProduct,
	getRelatedProduct,
	updateProduct,
	getReviewsProducts,
	getStockOutProducts,
	deleteProduct,
};
