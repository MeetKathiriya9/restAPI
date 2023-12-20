import express from 'express'
import { RegisterController, LoginController, UserController ,RefreshController} from '../Controller/index.js';
import userauth from '../Middleware/userauthHandler.js';

const router = express.Router();

// router.get("/",(req,res)=>{
//     res.send("success...");
// });

router.post("/register",RegisterController.register);
router.post("/login",LoginController.login);
router.post("/user",userauth,UserController.me);
router.post("/refresh",RefreshController.refresh);
router.post("/logout",LoginController.logout);

export default router;