import Review from "../models/review.model.js";
import Gig from "../models/gig.model.js";
import createError from "../utils/createError.js";

export const createReview = async (req, res, next) => {
  if (req.isSeller)
    return next(createError(403, "Only Buyers can create a review"));

  const newReview = new Review({
    userId: req.userId,
    gigId: req.body.gigId,
    desc: req.body.desc,
    star: req.body.star,
  });

  try {
    const review = await Review.findOne({ //if a review for this gig has been created, dont create another one
      gigId: req.body.gigId,
      userId: req.userId,
    });

    if (review) return next(createError(403, "Review created already"));

    const savedReview = await newReview.save();
    await Gig.findByIdAndUpdate(req.body.gigId, {
        $inc: { totalStars: req.body.star, starNumber: 1 },
      });
    res.status(200).send(savedReview);
  } catch (err) {
    next(err);
  }
};


//Getting a review for a gig
export const getReviews = async (req, res, next) => {
  try {
    const reviews = await Review.find({ gigId: req.params.gigId });
    res.status(200).send(reviews);
  } catch (err) {
    next(err);
  }
};

//Deleting a review for a gig
export const deleteReview = async () => {

}
