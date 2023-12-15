import Joi from "joi";
import CustomeErrorHandler from "../../Service/CustomeErrorHandler.js";
import user from "../../Model/user.js";

const RegisterController = {
    register(req, res, next) {

        const registerSchema = Joi.object({
            name: Joi.string().min(3).max(30).required(),
            email: Joi.string().email().required(),
            password: Joi.string().pattern(new RegExp('^[a-zA-Z0- 9]{3,20}$')).required(),
            role: Joi.string()
        })

        const { error } = registerSchema.validate(req.body);

        if (error) {
            return next(error);
        }

        const {name,email,password,role} = req.body;

        const userdata = new user({
            
        })

        // try {

        //     const exist = User.exists({ email: req.body.email })
        //     if (exist) {
        //         return next(CustomeErrorHandler.alreadyExits("User already exist.........."));
        //     }
        // }
        // catch (err) {

        // }

    }
}

export default RegisterController;