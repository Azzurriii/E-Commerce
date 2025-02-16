import express from 'express';
import { swaggerDocs } from '../configs/swagger';
import swaggerUi from 'swagger-ui-express';
import accessRouter from '@router/access.routes';
import userRouter from '@router/user.routes';
import MiddlewareAuthorization from '@middlewares/auth.middleware';
import serverAdapter from '@configs/bull-board';
import uploadRouter from '@router/upload.routes';
import brandRouter from '@router/brand.routes';
import categoryRouter from '@router/category.routes';
import couponRouter from '@router/coupon.routes';
import reviewRouter from '@router/review.routes';
import productRouter from '@router/product.routes';
import userOrderRouter from '@router/user.order.routes';

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
router.use('/api/brands', brandRouter());
router.use('/api/categories', categoryRouter());
router.use('/api/coupons', couponRouter());
router.use('/api/reviews', reviewRouter());
router.use('/api/products', productRouter());
router.use('/api/user-order', userOrderRouter());

export default (): express.Router => {
	return router;
};
