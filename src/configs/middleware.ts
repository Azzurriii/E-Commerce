import express from 'express';
import helmet from 'helmet';
import compression from 'compression';

const configureMiddleware = (app: express.Express) => {
	app.use(express.json());
	app.use(compression());
	app.use(express.urlencoded({ extended: true }));
	app.use(helmet());
};

export default configureMiddleware;
