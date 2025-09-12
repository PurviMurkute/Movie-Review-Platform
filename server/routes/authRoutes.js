import express from 'express';
import { postLogin, postSignUp } from '../controllers/user.js';

const authRouter = express.Router();

authRouter.post('/signup', postSignUp);
authRouter.post('/login', postLogin)

export default authRouter;