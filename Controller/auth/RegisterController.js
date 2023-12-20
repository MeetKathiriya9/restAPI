import Joi from "joi";
import user from "../../Model/user.js";
import bctypt from 'bcrypt'
import Jwtservice from "../../Service/Jwtservice.js";
import CustomeErrorHandler from "../../Service/CustomeErrorHandler.js";
import { REFRESH_SECRETKEY } from "../../config/index.js";

const RegisterController = {
    async register(req, res, next) {

        const registerSchema = Joi.object({
            name: Joi.string().min(3).max(30).required(),
            email: Joi.string().email().required(),
            password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9 ]{3,20}$')).required(),
            role: Joi.string()
        })

        const { error } = registerSchema.validate(req.body);

        if (error) {
            return next(error);
        }

        const { name, email, password, role } = req.body;

        const emailverify = await user.exists({ email: email })

        if (emailverify) {
            return next(CustomeErrorHandler.alreadyExits("email already exists"))
        }

        const bcryptpass = await bctypt.hash(password, 10);

        const userdata = await new user({
            name, email, password: bcryptpass, role
        })

        let access_token,refresh_token;
        try {          
            const finaldata = await userdata.save();

            // res.send(finaldata);
            console.log(finaldata)

            access_token = Jwtservice.sign({ _id: finaldata._id, role: finaldata.role })
            refresh_token = Jwtservice.sign({ _id: finaldata._id, role: finaldata.role },"1d",REFRESH_SECRETKEY)
        }
        catch (err) {
            return next(err)
        }

        res.json({ access_token: access_token ,refresh_token:refresh_token});
        // console.log(token)

    }
}

export default RegisterController;