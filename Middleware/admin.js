import UserSchema from '../Model/user.js'
import CustomErrorHandler from '../Service/CustomeErrorHandler.js';

const admin = async (req, res, next) => {
    try {
        const user = await UserSchema.findOne({ _id: req.user._id });

        if (user.role === 'admin') {
            next();
        } else {
            return next(CustomErrorHandler.unauthorized());
        }

    } catch (err) {
        return next(CustomErrorHandler.serverError());
    }
}
export default admin;
