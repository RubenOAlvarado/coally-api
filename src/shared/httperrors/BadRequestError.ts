import { CustomError } from "../errors/CustomError";

export default class BadRequestError extends CustomError {
    private static readonly STATUS_CODE = 400;
    private readonly _code: number;
    private readonly _logging: boolean;
    private readonly _context: { [key: string]: any };

    constructor(params?: { code?: number, message?: string, context?: { [key: string]: any }, logging?: boolean }) {
        super(params?.message || 'Bad request');
        this._code = params?.code || BadRequestError.STATUS_CODE;
        this._logging = params?.logging || false;
        this._context = params?.context || {};

        Object.setPrototypeOf(this, BadRequestError.prototype);
    }

    get errors() {
        return [{ message: this.message, context: this._context }];
    }

    get statusCode() {
        return this._code;
    }

    get logging() {
        return this._logging;
    }
}