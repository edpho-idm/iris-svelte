import { AppError } from './AppError';

export class BadRequestError extends AppError {
	constructor(message: string = 'Bad Request') {
		super(message, 400, 'BAD_REQUEST');
	}
}

export class UnauthorizedError extends AppError {
	constructor(message: string = 'Unauthorized') {
		super(message, 401, 'UNAUTHORIZED');
	}
}

export class ForbiddenError extends AppError {
	constructor(message: string = 'Forbidden') {
		super(message, 403, 'FORBIDDEN');
	}
}

export class NotFoundError extends AppError {
	constructor(message: string = 'Not Found') {
		super(message, 404, 'NOT_FOUND');
	}
}

export class ValidationError extends AppError {
	constructor(message: string = 'Validation Error') {
		super(message, 422, 'VALIDATION_ERROR');
	}
}

export class InternalServerError extends AppError {
	constructor(message: string = 'Internal Server Error') {
		super(message, 500, 'INTERNAL_SERVER_ERROR');
	}
}

export class DataNotFoundError extends AppError {
	constructor(message: string = 'Data Not Found') {
		super(message, 404, 'DATA_NOT_FOUND');
	}
}

export class UnknownError extends AppError {
	constructor(message: string = 'An unknown error occurred') {
		super(message, 500, 'UNKNOWN_ERROR');
	}
}
