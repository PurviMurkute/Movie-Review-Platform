import express from 'express';
import { getUserbyId, postLogin, postSignUp, putUserbyId } from '../controllers/user.js';
import { verifyJWT } from '../middlewares/jwt.js';

const authRouter = express.Router();

authRouter.post('/signup', postSignUp);
authRouter.post('/login', postLogin);
authRouter.get('/user/:userId', verifyJWT, getUserbyId);
authRouter.put('/user/:userId', verifyJWT, putUserbyId);

export default authRouter;