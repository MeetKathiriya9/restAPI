class CustomeErrorHandler extends Error {
    constructor(status,msg){
        super();
        this.status = status;
        this.message = msg;
    }

    static alreadyExits(message){
        return new CustomeErrorHandler(404,message);
    }
}

export default CustomeErrorHandler;