import { NextFunction, Request, Response } from "express";
import { HttpError } from "../../shared/errors/HttpError";

export const errorHandlerMiddleware = (
    error: Error,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    if (error instanceof HttpError) {
        return res.status(error.statusCode).json({ message: error.message });
    }
    console.error(error);
    return res.status(500).json({ message: 'An unknown error occurred' });
};