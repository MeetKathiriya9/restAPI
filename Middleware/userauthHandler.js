import CustomeErrorHandler from "../Service/CustomeErrorHandler.js";
import Jwtservice from "../Service/Jwtservice.js";

const userauth = async (req, res, next) => {
    const Authorization = req.headers.authorization;

    // console.log(Authorization);

    if(!Authorization){
        return next(CustomeErrorHandler.unauthorized())
    }

    const token = Authorization.split(" ")[1];

    // console.log(token);

    try{
        const {_id, role} = Jwtservice.verify(token);

        const user = {
            _id,
            role
        }

        req.user = user;
        next();
    }
    catch(err){
        return next(err);
    }
}   

export default userauth;