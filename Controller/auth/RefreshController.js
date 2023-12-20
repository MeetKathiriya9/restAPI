import Joi from "joi"
import CustomeErrorHandler from "../../Service/CustomeErrorHandler.js";
import userToken from "../../Model/userToken.js";
import Jwtservice from '../../Service/Jwtservice.js'
import { REFRESH_SECRETKEY } from "../../config/index.js";
import User from '../../Model/user.js'

const RefreshController = {
    async refresh(req, res, next) {

        const refreshSchema = Joi.object({
            refresh_token: Joi.string().required()
        })

        const { error } = refreshSchema.validate(req.body);

        if (error) {
            return next(error)
        }

        let RefreshToken;

        try {

            RefreshToken = await userToken.findOne({ token: req.body.refresh_token })

            if (!RefreshToken) {
                return next(CustomeErrorHandler.unauthorized("Invalid Refresh Token"))
            }

            let userId,userdata;
            try {

                const { _id } = await Jwtservice.verify(RefreshToken.token, REFRESH_SECRETKEY)

                userId = _id;

                userdata = await User.findOne({ _id: userId })

                if (!userdata) {
                    return next(CustomeErrorHandler.notfound("User not found......"))
                }
            }
            catch (err) {
                return next(CustomeErrorHandler.unauthorized("Invalid Refresh Token"))
            }

            const access_token = Jwtservice.sign({ _id: userdata._id, role: userdata.role })
            const refresh_token = Jwtservice.sign({ _id: userdata._id, role: userdata.role },
                '1y', REFRESH_SECRETKEY)

            // database list
            await userToken.create({ token: refresh_token })

            res.json({ access_token: access_token, refresh_token: refresh_token })
        }
        catch (err) {
            return next(CustomeErrorHandler.notfound("Something is wrong here..."))
        }

    }
}

export default RefreshController;

