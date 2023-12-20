import Joi from 'joi'
import User from '../../Model/user.js'
import CustomeErrorHandler from '../../Service/CustomeErrorHandler.js'
import bcrypt from 'bcrypt'
import { REFRESH_SECRETKEY } from '../../config/index.js'
import Jwtservice from '../../Service/Jwtservice.js'
import userToken from '../../Model/userToken.js'

const logincontroller = {
    async login(req, res, next) {

        const loginSchema = Joi.object({
            email: Joi.string().email().required(),
            password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9 ]{3,20}$')).required(),
        })

        const { error } = loginSchema.validate(req.body)

        if (error) {
            return next(error)
        }

        let access_token,refresh_token;
        try {
            const user = await User.findOne({ email: req.body.email })

            if (!user) {
                return next(CustomeErrorHandler.wrongcrendentials())
            }
            // console.log(user);

            const match = await bcrypt.compare(req.body.password , user.password )

            if(!match){
                return next(CustomeErrorHandler.wrongcrendentials())
            }

            // res.send("succes")

            access_token = Jwtservice.sign({ _id: user._id, role: user.role })
            refresh_token = Jwtservice.sign({ _id: user._id, role: user.role },"1d",REFRESH_SECRETKEY)

            await userToken.create({token : refresh_token})

            res.json({ access_token: access_token ,refresh_token:refresh_token});
        }
        catch(err){
            return next(err);
        }

       
    },
    async logout(req, res, next){
        
        const refreshSchema = Joi.object({
            refresh_token: Joi.string().required()
        })

        const { error } = refreshSchema.validate(req.body);

        if (error) {
            return next(error)
        }

        try{

            await userToken.deleteOne({token : req.body.refresh_token})
        
        }
        catch(err){
            return next(new Error());
        }

        res.json("success");
    }
}

export default logincontroller;