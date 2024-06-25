import { ValidationChain, validationResult } from "express-validator";
import { body, param, query } from 'express-validator'
import { Request, Response, NextFunction } from "express";





const Addproduct =[
    body('productname')
        .notEmpty()
        .withMessage('productname is required'),

    body('description')
        .notEmpty()
        .withMessage('description is required'),

    body('Originalprice')
        .notEmpty()
        .withMessage('Originalprice is required'),

    body('Price')
        .notEmpty()
        .withMessage('Price is required'),

    body('category')
        .notEmpty()
        .withMessage('category is required'),

    body('stock')
        .notEmpty()
        .withMessage('stock is required'),
        
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



module.exports = {validate,Addproduct}