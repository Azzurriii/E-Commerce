import express from 'express';
import { swaggerDocs } from '@configs/swagger';
import swaggerUi from 'swagger-ui-express';
import accessRouter from '@routes/access.routes';
import userRouter from '@routes/user.routes';
import MiddlewareAuthorization from '@middlewares/auth.middleware';
import serverAdapter from '@configs/bull-board';
import uploadRouter from '@routes/upload.routes';
import categoryRouter from '@routes/category.routes';
import inventoryRouter from '@routes/inventory.routes';
import discountRouter from '@routes/discount.routes';
import productRouter from '@routes/product.routes';
import paymentRouter from '@routes/payment.routes';
import cartRouter from '@routes/cart.routes';
import orderRouter from '@routes/order.routes';
import userAddressRouter from '@routes/user-address.routes';
import orderItemRouter from '@routes/order-item.routes';
import userPaymentRouter from '@routes/user-payment.routes';
import checkoutRouter from '@routes/checkout.routes';
import reviewRouter from '@routes/review.routes';
const router = express.Router();

/*
 * 1. Public routes (No authentication required)
 */
router.get('/', async (req, res) => {
	return res.status(200).json({
		message: 'Welcome to Shopify API',
	});
});

// Documentation & Monitoring
router.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
router.use('/queues', serverAdapter.getRouter());

/*
 * 2. API Key Protected Routes
 * All routes below this point require API key
 */
router.use(MiddlewareAuthorization.checkApiKey);

// API Routes
router.use('/api/auth', accessRouter());
router.use('/api/user', userRouter());
router.use('/api/upload', uploadRouter());
router.use('/api/categories', categoryRouter());
router.use('/api/inventories', inventoryRouter());
router.use('/api/discounts', discountRouter());
router.use('/api/products', productRouter());
router.use('/api/user-addresses', userAddressRouter());
router.use('/api/payments', paymentRouter());
router.use('/api/orders', orderRouter());
router.use('/api/order-items', orderItemRouter());
router.use('/api/user-payments', userPaymentRouter());
router.use('/api/checkout', checkoutRouter());
router.use('/api/reviews', reviewRouter());

router.use(MiddlewareAuthorization.checkAuthentication);
router.use(MiddlewareAuthorization.checkPermission('0000'));
router.use('/api/carts', cartRouter());

export default (): express.Router => {
	return router;
};
