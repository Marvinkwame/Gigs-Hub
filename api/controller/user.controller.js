import User from "../models/user.model.js";
import jwt from "jsonwebtoken";
import createError from "../utils/createError.js";

export const deleteUser = async (req, res, next) => {
  const user = await User.findById(req.params.id); //  app.use(....../id) that is the req.params.id

  //very important to understand
  if (req.userId !== user._id.toString()) {
    return next(createError(403, "You can delete only your account")) 
  }

  await User.findByIdAndDelete(req.params.id);
  res.status(200).send("Deleted");

  //await User.findByIdAndDelete(req.params.id);
};
