import { StatusCode, ReasonStatusCode, Status } from '@constants/status-code';
import { Response } from 'express';
interface ResponseData<T> {
	statusCode: number;
	message: string;
	data?: T;
}

// export function createResponse<T>(res: Response, status: Status, data?: T): Response<ResponseData<T>> {
// 	const statusCode = StatusCode[status];
// 	const message = ReasonStatusCode[status];
// 	return res.status(statusCode).json({
// 		statusCode,
// 		message,
// 		data,
// 	});
// }

export class ErrorResponse extends Error {
	statusCode: number;
	constructor(message: string, statusCode: number) {
		super(message);
		this.statusCode = statusCode;
	}
}

export class BadRequestError extends ErrorResponse {
	constructor(message: string = ReasonStatusCode.BAD_REQUEST, statusCode: number = StatusCode.BAD_REQUEST) {
		super(message, statusCode);
	}
}

export class AuthFailureError extends ErrorResponse {
	constructor(message: string = ReasonStatusCode.UNAUTHORIZED, statusCode: number = StatusCode.UNAUTHORIZED) {
		super(message, statusCode);
	}
}

export class NotFoundError extends ErrorResponse {
	constructor(message: string = ReasonStatusCode.NOT_FOUND, statusCode: number = StatusCode.NOT_FOUND) {
		super(message, statusCode);
	}
}

export class FobbidenError extends ErrorResponse {
	constructor(message: string = ReasonStatusCode.FORBIDDEN, statusCode: number = StatusCode.FORBIDDEN) {
		super(message, statusCode);
	}
}

class SuccessResponse {
	message: string;
	status: number;
	data: any;

	constructor({
		message,
		statusCode,
		reasonStatusCode,
		data = {},
	}: {
		message: string;
		statusCode: number;
		reasonStatusCode: string;
		data: any;
	}) {
		this.message = !message ? reasonStatusCode : message;
		this.status = statusCode;
		this.data = data;
	}
	send(res: Response, headers = {}) {
		return res.status(this.status).json(this);
	}
}

export class OK extends SuccessResponse {
	constructor({ message, data }: { message: string; data: any }) {
		super({ message, statusCode: StatusCode.OK, reasonStatusCode: ReasonStatusCode.OK, data });
	}
}

export class CREATED extends SuccessResponse {
	constructor({ message, data }: { message: string; data: any }) {
		super({ message, statusCode: StatusCode.CREATED, reasonStatusCode: ReasonStatusCode.CREATED, data });
	}
}
