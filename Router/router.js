import express from 'express'
import { RegisterController } from '../Controller/index.js';

const router = express.Router();

// router.get("/",(req,res)=>{
//     res.send("success...");
// });

router.post("/register",RegisterController.register);

export default router;