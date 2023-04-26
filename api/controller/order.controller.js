import Gig from "../models/gig.model.js";
import Order from "../models/order.model.js";

export const createOrder = async (req, res, next) => {
  try {
    const gig = await Gig.findById(req.params.gigId); //finding the gig but using the id in the link eg: http://localhost:3000/gig/64471fb256b5028ae4f5fae9

    const newOrder = new Order({
      gigId: gig._id,
      img: gig.cover,
      title: gig.title,
      buyerId: req.userId,
      sellerId: gig.userId,
      price: gig.price,
      payment_intent: "temporary",
    });

    await newOrder.save();
    res.status(200).send("done");
  } catch (err) {
    next(err);
  }
};


//Getting orders
export const getOrders = async (req, res, next) => {
  try {
    const order = await Order.find({
      ...(req.isSeller ? { sellerId: req.userId } : { buyerId: req.userId }),
      isCompleted: true,
    });

    res.status(200).send(order)
  } catch (err) {
    next(err);
  }
};
