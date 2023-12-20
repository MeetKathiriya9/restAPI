class CustomeErrorHandler extends Error {
    constructor(status,msg){
        super();
        this.status = status;
        this.message = msg;
    }

    static alreadyExits(message){
        return new CustomeErrorHandler(404,message);
    }

    static wrongcrendentials(message = 'Wrong username or password'){
        return new CustomeErrorHandler(404,message);
    }

    static notfound(message = 'User N0t Found'){
        return new CustomeErrorHandler(404,message);
    }

    static unauthorized(message = 'Unauthorzed'){
        return new CustomeErrorHandler(404,message);
    }
    
    static servererror(message = 'internal server error'){
        return new CustomeErrorHandler(404,message);
    }
}
export default CustomeErrorHandler;