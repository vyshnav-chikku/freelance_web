import createError from "../utils/createError.js";
import Review from "../models/review.model.js";
import Gig from "../models/gig.model.js";

export const createReview = async (req, res, next) => {
  if (req.isSeller)
    return next(createError(403, "Sellers can't create a review!"));


    console.log("create",req.body);

  const newReview = new Review({
    userId: req.body.userId,
    gigId: req.body.review.gigId,
    desc: req.body.review.desc,
    star: req.body.review.star,
  });

  try {
    const review = await Review.findOne({
      gigId: req.body.review.gigId,
      userId: req.body.userId,
    });

    if (review)
      return next(
        createError(403, "You have already created a review for this gig!")
      );

    //TODO: check if the user purchased the gig.

    const savedReview = await newReview.save();

    await Gig.findByIdAndUpdate(req.body.review.gigId, {
      $inc: { totalStars: req.body.review.star, starNumber: 1 },
    });
    res.status(201).send(savedReview);
  } catch (err) {
    next(err);
  }
};

export const getReviews = async (req, res, next) => {
  try {
    const reviews = await Review.find({ gigId: req.params.gigId });
    res.status(200).send(reviews);
  } catch (err) {
    next(err);
  }
};
export const deleteReview = async (req, res, next) => {
  try {
  } catch (err) {
    next(err);
  }
};
