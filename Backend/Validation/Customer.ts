import { ValidationChain, validationResult } from "express-validator";
import { body, param, query } from 'express-validator'
import { Request, Response, NextFunction } from "express";






const register = [
    body('name')
        .notEmpty()
        .withMessage('name is required'),

    body('email')
        .notEmpty()
        .withMessage('email is required'),

    body('password')
        .notEmpty()
        .withMessage('password is required')
        .isLength({ min: 8 })
        .withMessage('password must be 8 charectar'),


]

const login = [
 

    body('email')
        .notEmpty()
        .withMessage('email is required'),

    body('password')
        .notEmpty()
        .withMessage('password is required')
        


]

const validate = (validations: ValidationChain[]) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            for (const validation of validations) {
                await validation.run(req);
            }

            const errors = validationResult(req);
            if (errors.isEmpty()) {   // if the errors are empty
                return next();    // we are going to next function or controller
            }

            let message = ''

            for (const err of errors.array()) {
                message += err.msg
            }

            res.status(400).json({ message});
        } catch (error) {
            res.status(500).json({ error });
        }
    };
};




module.exports = {validate,register,login}