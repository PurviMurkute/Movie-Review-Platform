import express from 'express';
import { getMoviebyId, getmovies } from '../controllers/movie.js';
import { verifyJWT } from '../middlewares/jwt.js';
import { getReviewsByMovie, postReviews } from '../controllers/review.js';

const movieRouter = express.Router();

movieRouter.get('/movies', getmovies);
movieRouter.post('/movies/:movieId/reviews', verifyJWT, postReviews);
movieRouter.get('/movies/:movieId/reviews', getReviewsByMovie);
movieRouter.get('/movies/:movieId', getMoviebyId);

export default movieRouter;