
import User from "../../Model/user.js"
import CustomeErrorHandler from "../../Service/CustomeErrorHandler.js"

const UserController = {
    async me(req, res, next) {

        try {
            const user = await User.findOne({ _id: req.user._id }).select("-password -createdAt -updatedAt -__v")

            if (!user) {
                return next(CustomeErrorHandler.notfound())
            }

            res.json(user)

        } catch (err) {
            return next(err)
        }
    }
}

export default UserController;