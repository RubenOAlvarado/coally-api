import { check, param, query } from 'express-validator';

export const createTaskValidation = [
    check('title')
        .isString().withMessage('Title must be a string')
        .isLength({ min: 3, max: 255 }).withMessage('Title must be between 3 and 255 characters')
        .notEmpty().withMessage('Title is required'),
    check('description')
        .optional()
        .isString().withMessage('Description must be a string')
        .isLength({ min: 3, max: 255 }).withMessage('Description must be between 3 and 255 characters'),
];

export const getTaskByIdValidation = [
    param('id')
        .isMongoId().withMessage('Invalid task id'),
];

export const updateTaskValidation =[
    param('id')
        .isMongoId().withMessage('Invalid task id'),
    check('title')
        .optional()
        .isString().withMessage('Title must be a string')
        .isLength({ min: 3, max: 255 }).withMessage('Title must be between 3 and 255 characters'),
    check('description')
        .optional()
        .isString().withMessage('Description must be a string')
        .isLength({ min: 3, max: 255 }).withMessage('Description must be between 3 and 255 characters'),
];

export const getAllTasksValidation =[
    query('status')
        .optional()
        .isIn(['completed', 'pending']).withMessage('Status must be either "completed" or "pending"'),
];