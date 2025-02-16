import '@configs/env';
import express, { Response, Request, NextFunction } from 'express';
import http from 'http';
import { Server } from 'socket.io';
import socketBE from './socket';
import router from '@router/index';
import configureMiddleware from '@configs/middleware';
import '@configs/db';
import '@configs/redis';
import { ErrorResponse } from '@handlers/response-handler';

const app = express();

configureMiddleware(app);

const server = http.createServer(app);
const io = new Server(server);
io.on('connection', (socket) => socketBE.init({ socket, io }));

app.set('io', io);
app.use('/', router());

// 404 handler
app.use((req: Request, res: Response) => {
	return res.status(404).json({
		statusCode: 404,
		message: 'API Route Not Found',
	});
});

// Unified error handler
app.use((error: Error | ErrorResponse, req: Request, res: Response, next: NextFunction) => {
	// Log error for debugging
	console.error('Error:', {
		name: error.name,
		message: error.message,
		stack: error.stack,
	});

	// Handle known errors (ErrorResponse)
	if ('statusCode' in error) {
		const errorResponse = error as ErrorResponse;
		return res.status(errorResponse.statusCode).json({
			statusCode: errorResponse.statusCode,
			message: errorResponse.message,
		});
	}

	// Handle unexpected errors
	return res.status(500).json({
		statusCode: 500,
		message:
			process.env.NODE_ENV === 'production' ? 'Internal Server Error' : error.message || 'Internal Server Error',
	});
});

const port = process.env.PORT || 8000;
server.listen(port, () => {
	console.info(`✅ Server running on http://127.0.0.1:${port}/`);
});
