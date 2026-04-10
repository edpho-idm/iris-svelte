import * as Errors from './ConcreteErrors';
import { AppError } from './AppError';

export class ErrorMapper {
	static map(error: unknown): AppError {
		if (error instanceof AppError) {
			return error;
		}

		if (error instanceof Error) {
			// Jika error memiliki status (seperti dari fetch response)
			const status = (error as any).status;
			if (status) {
				return this.mapFromStatus(status, error.message);
			}
			return new Errors.UnknownError(error.message);
		}

		return new Errors.UnknownError(String(error));
	}

	static mapFromStatus(status: number, message?: string): AppError {
		switch (status) {
			case 400:
				return new Errors.BadRequestError(message);
			case 401:
				return new Errors.UnauthorizedError(message);
			case 403:
				return new Errors.ForbiddenError(message);
			case 404:
				return new Errors.NotFoundError(message);
			case 422:
				return new Errors.ValidationError(message);
			case 500:
				return new Errors.InternalServerError(message);
			default:
				if (status >= 500) return new Errors.InternalServerError(message);
				return new Errors.UnknownError(message);
		}
	}
}
