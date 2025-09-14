import Watchlist from "../models/Watchlist.js";
import { getCache, createCache, flushCache } from "../utils/cache.js";

const postWatchlist = async (req, res) => {
  const userId = req.user._id;
  const { movieId } = req.params;

  try {
    const existing = await Watchlist.findOne({ userId, movieId });

    if (existing) {
      return res.status(400).json({
        success: false,
        data: null,
        message: "Movie already added to the watchlist",
      });
    }

    const newWatchlist = await Watchlist.create({
      userId,
      movieId,
    });

    const savedWatchlist = await newWatchlist.save();

    await flushCache(`watchlist: ${userId}`);

    return res.status(201).json({
      success: true,
      data: savedWatchlist,
      message: "Movie added to the Watchlist",
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      data: null,
      message: error?.message,
    });
  }
};

const getWatchlistbyUser = async (req, res) => {
  const userId = req.user._id;

  try {
    const cachedWatchlist = await getCache(`watchlist: ${userId}`);
    if (cachedWatchlist) {
      return res.status(200).json({
        success: true,
        data: cachedWatchlist,
        message: "Watchlist fetched successfully (from cache)",
      });
    }

    const watchlist = await Watchlist.find({ userId }).populate("userId", "username profile email") 
      .sort({ createdAt: -1 });

    if (!watchlist) {
      return res.status(404).json({
        success: false,
        data: null,
        message: "Movies not added to watchlist",
      });
    }

    await createCache(`watchlist: ${userId}`, watchlist);

    return res.status(200).json({
      success: true,
      data: watchlist,
      message: "Watchlist fetched successfully",
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      data: null,
      message: error?.message,
    });
  }
};

const deleteMovieFromWatchlist = async (req, res) => {
  const { movieId } = req.params;
  const userId = req?.user?._id;

  try {
    const existing = await Watchlist.findOne({ userId, movieId });

    if (!existing) {
      return res.status(400).json({
        success: false,
        data: null,
        message: "Movie not found in watchlist",
      });
    }

    await Watchlist.findOneAndDelete({ userId, movieId });

    await flushCache(`watchlist: ${userId}`);

    return res.status(200).json({
      success: true,
      data: movieId,
      message: "Movie removed from watchlist successfully",
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      data: null,
      message: error?.message,
    });
  }
};

export { postWatchlist, getWatchlistbyUser, deleteMovieFromWatchlist };
