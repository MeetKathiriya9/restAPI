import { SECRETKEY } from '../config/index.js'
import Jwt from 'jsonwebtoken';

class Jwtservice{
    
    static sign(payload, expiresIn = "1d", secret = SECRETKEY){
       return Jwt.sign(payload,  secret, {expiresIn: expiresIn})
    }

    static verify(payload,secret = SECRETKEY){
        return Jwt.verify(payload,  secret)
     }
}

export default Jwtservice;