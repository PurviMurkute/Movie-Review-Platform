import express from 'express';
import { verifyJWT } from '../middlewares/jwt.js';
import { deleteMovieFromWatchlist, getWatchlistbyUser, postWatchlist } from '../controllers/watchlist.js';

const watchlistRouter = express.Router();

watchlistRouter.post('/users/:movieId/watchlist', verifyJWT, postWatchlist);
watchlistRouter.get('/users/:userId/watchlist', verifyJWT, getWatchlistbyUser);
watchlistRouter.delete('/users/:userId/watchlist/:movieId', verifyJWT, deleteMovieFromWatchlist);

export default watchlistRouter;