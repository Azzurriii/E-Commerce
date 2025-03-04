import Product from '@models/product.model';
import { ICreateProduct, IUpdateProduct } from '@interfaces/product';
import { NotFoundError } from '@handlers/response-handler';
import Category from '@models/category.model';
import Discount from '@models/discount.model';

// create product service
const addProduct = async (data: ICreateProduct) => {
	const product = await Product.create(data);
	return product;
};

// get all product
const getProducts = async (page = 1, limit = 10) => {
	const skip = (page - 1) * limit;
	const products = await Product.find({}).skip(skip).limit(limit);
	const total = await Product.countDocuments({});
	return {
		products,
		pagination: {
			total,
			page,
			limit,
			pages: Math.ceil(total / limit),
		},
	};
};

// delete product
const deleteProduct = async (id: string) => {
	const result = await Product.findByIdAndDelete(id);
	return result;
};

// update product
const updateProduct = async (id: string, payload: IUpdateProduct) => {
	await getProduct(id);
	const result = await Product.findOneAndUpdate({ _id: id }, payload, {
		new: true,
	});
	return result;
};

// get single product
const getProduct = async (id: string) => {
	const result = await Product.findById(id);
	if (!result) {
		throw new NotFoundError('Product not found !');
	}
	return result;
};

// get products by category
const getProductsByCategory = async (categoryName: string, page = 1, limit = 10) => {
	const skip = (page - 1) * limit;
	const category = await Category.findOne({ name: categoryName });
	if (!category) {
		throw new NotFoundError('Category not found !');
	}
	const products = await Product.find({ category_id: category._id }).skip(skip).limit(limit);
	const total = await Product.countDocuments({ category_id: category._id });
	return {
		products,
		pagination: {
			total,
			page,
			limit,
			pages: Math.ceil(total / limit),
		},
	};
};

// get products by most discount
const getProductsByDiscount = async (page = 1, limit = 10) => {
	const skip = (page - 1) * limit;
	const discount = await Discount.find({}).sort({ discount_percent: -1 }).limit(10);
	if (!discount) {
		throw new NotFoundError('Discount not found !');
	}
	const products = await Product.find({ discount_id: discount[0]._id }).skip(skip).limit(limit);
	const total = await Product.countDocuments({ discount_id: discount[0]._id });
	return {
		products,
		pagination: {
			total,
			page,
			limit,
			pages: Math.ceil(total / limit),
		},
	};
};

// get products by search
const searchProducts = async (search: string, page = 1, limit = 10) => {
	const skip = (page - 1) * limit;
	const products = await Product.find({ name: { $regex: search, $options: 'i' } })
		.skip(skip)
		.limit(limit);
	const total = await Product.countDocuments({ name: { $regex: search, $options: 'i' } });
	return {
		products,
		pagination: {
			total,
			page,
			limit,
			pages: Math.ceil(total / limit),
		},
	};
};

// get recommended products
const getRecommendedProducts = async () => {
	// Recommend: Same category, same price range
	const products = await Product.find({});
	const recommendedProducts = [];
	for (const product of products) {
		const category = await Category.findById(product.category_id);
		const priceRange = await Product.find({
			price: { $gte: Number(product.price) - 100, $lte: Number(product.price) + 100 },
		});

		if (category) {
			const sameCategory = await Product.find({ category_id: category._id });
			recommendedProducts.push(priceRange, sameCategory);
		} else {
			recommendedProducts.push(priceRange);
		}
	}
	return recommendedProducts;
};

// get products by price range
const getProductsByPriceRange = async (min: number, max: number, page = 1, limit = 10) => {
	const skip = (page - 1) * limit;
	const products = await Product.find({ price: { $gte: min, $lte: max } })
		.skip(skip)
		.limit(limit);
	const total = await Product.countDocuments({ price: { $gte: min, $lte: max } });
	return {
		products,
		pagination: {
			total,
			page,
			limit,
			pages: Math.ceil(total / limit),
		},
	};
};

// get most loved products
// TODO: Implement this with review rating
const getMostLovedProducts = async (page = 1, limit = 10) => {
	const skip = (page - 1) * limit;
	const products = await Product.find({ most_loved: true }).skip(skip).limit(limit);
	const total = await Product.countDocuments({ most_loved: true });
	return {
		products,
		pagination: {
			total,
			page,
			limit,
			pages: Math.ceil(total / limit),
		},
	};
};

// get product by set
// TODO: Implement this with Set table
const getProductBySet = async (setId: string, page = 1, limit = 10) => {
	const skip = (page - 1) * limit;
	const products = await Product.find({ set_id: setId }).skip(skip).limit(limit);
	const total = await Product.countDocuments({ set_id: setId });
	return {
		products,
		pagination: {
			total,
			page,
			limit,
			pages: Math.ceil(total / limit),
		},
	};
};

// get best seller products
// TODO: Implement this with Order table
const getBestSellerProducts = async (page = 1, limit = 10) => {
	const skip = (page - 1) * limit;
	const products = await Product.find({ best_seller: true }).skip(skip).limit(limit);
	const total = await Product.countDocuments({ best_seller: true });
	return {
		products,
		pagination: {
			total,
			page,
			limit,
			pages: Math.ceil(total / limit),
		},
	};
};

export default {
	addProduct,
	getProducts,
	deleteProduct,
	updateProduct,
	getProduct,
	getProductsByCategory,
	getProductsByDiscount,
	searchProducts,
	getRecommendedProducts,
	getProductsByPriceRange,
	getMostLovedProducts,
	getProductBySet,
	getBestSellerProducts,
};
