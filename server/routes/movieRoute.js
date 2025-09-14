import express from 'express';
import { getMoviebyId, getpopularmovies, gettrendingmovies, movieSearch } from '../controllers/movie.js';
import { verifyJWT } from '../middlewares/jwt.js';
import { getReviewsByMovie, postReviews } from '../controllers/review.js';

const movieRouter = express.Router();

movieRouter.get('/popular/movies', getpopularmovies);
movieRouter.get('/trending/movies', gettrendingmovies);
movieRouter.post('/movies/:movieId/reviews', verifyJWT, postReviews);
movieRouter.get('/movies/:movieId/reviews', getReviewsByMovie);
movieRouter.get('/movies/:movieId', getMoviebyId);
movieRouter.get('/search', movieSearch);

export default movieRouter;