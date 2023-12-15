import { DEBUG_MODE } from '../config/index.js'
import Joi from 'joi';
const { ValidationError } = Joi;

import CustomeErrorHandler from '../Service/CustomeErrorHandler.js';

const errorHandler = (err, req, res, next) => {
    let statuscode = 500;
    let errdata = {
        mes: "internal server error...!",

        ...(DEBUG_MODE = 'true' && { originalError: err.message })

    }

    if (err instanceof ValidationError) {
        statuscode = 455;
        errdata = {
            mes: err.message
        }
    }

    if (err instanceof CustomeErrorHandler) {
        statusCode = err.status;
        errdata = {
            mess: err.message
        }
    }

    return res.status(statuscode).json(errdata);
}

export default errorHandler;