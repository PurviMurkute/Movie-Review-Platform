import express from 'express';
import { getmovies } from '../controllers/movie.js';

const movieRouter = express.Router();

movieRouter.get('/movies', getmovies);

export default movieRouter;