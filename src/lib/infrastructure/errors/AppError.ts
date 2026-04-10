export abstract class AppError extends Error {
	public readonly statusCode: number;
	public readonly code: string;

	constructor(message: string, statusCode: number, code: string = 'UNKNOWN_ERROR') {
		super(message);
		this.statusCode = statusCode;
		this.code = code;
		this.name = this.constructor.name;
		Object.setPrototypeOf(this, new.target.prototype);
	}
}
