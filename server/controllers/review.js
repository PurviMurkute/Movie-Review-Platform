import Review from "../models/Review.js";
import { createCache, getCache, flushCache } from "../utils/cache.js";

const postReviews = async (req, res) => {
  const userId = req?.user?._id;
  const { movieId } = req.params;

  const { rating, reviewText } = req.body;

  if (!rating) {
    return res.status(400).json({
      success: false,
      data: null,
      message: "Ratings are required",
    });
  }

  try {
    const newReview = await Review.create({
      userId: userId,
      movieId: movieId,
      rating,
      reviewText,
    });

    const savedReview = await newReview.save();

    await flushCache(`reviews:${movieId}`);

    return res.status(201).json({
      success: true,
      data: savedReview,
      message: "Review posted successfully",
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      data: null,
      message: error?.message || "Failed to post review",
    });
  }
};

const getReviewsByMovie = async (req, res) => {
  const { movieId } = req.params;

  try {
    const cachedReviews = await getCache(`reviews:${movieId}`);

    if (cachedReviews) {
      return res.status(200).json({
        success: true,
        data: cachedReviews,
        message: "Reviews fetched successfully (from cache)",
      });
    }

    const reviews = await Review.find({ movieId: movieId }).sort({
      createdAt: -1,
    });

    if (!reviews) {
      return res.status(404).json({
        success: false,
        data: null,
        message: "Reviews not found for this movie",
      });
    }

    await createCache(`reviews:${movieId}`, reviews);

    return res.status(200).json({
      success: true,
      data: reviews,
      message: "REviews fetched successfully",
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      data: null,
      message: error?.message || "Failed to fetch reviews",
    });
  }
};

export { postReviews, getReviewsByMovie };
