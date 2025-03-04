import express from 'express';
import helmet from 'helmet';
import compression from 'compression';
import cors from 'cors';

const configureMiddleware = (app: express.Express) => {
	app.use(cors());
	app.use(express.json());
	app.use(compression());
	app.use(express.urlencoded({ extended: true }));
	app.use(helmet());
};

export default configureMiddleware;
