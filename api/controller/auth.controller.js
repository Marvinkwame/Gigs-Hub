import User from "../models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import createError from "../utils/createError.js";

//Registering A New User
export const register = async (req, res, next) => {
  try {
    const hashPassword = bcrypt.hashSync(req.body.password, 5); //hashing the password
    const newUser = new User({
      ...req.body,
      password: hashPassword,
    });
    await newUser.save();
    res.status(201).send("Done registering");
  } catch (err) {
    next(err);
  }
};

//Login
export const login = async (req, res, next) => {
  try {
    const user = await User.findOne({ username: req.body.username }); //finding the user with username inputed
    if (!user) return next(createError(404, "User not found"));

    const comparePassword = bcrypt.compareSync(  //compare the inputed password and the one in mongodb
      req.body.password, //getting it from the user
      user.password //getting from the database
    ); 
    if (!comparePassword) return res.status(400).send("Wrong password");

    const token = jwt.sign(
      {
        id: user._id,
        isSeller: user.isSeller, //very important because i dont want a seller to create a review or an order
      },
      process.env.JWT_KEY
    );

    const { password, ...info } = user._doc; //destructring the password and info from the user._doc

    return res
      .cookie("accessToken", token, { httpOnly: true })
      .status(200)
      .send(info); //use the info in the front end to show the user details
  } catch (err) {
    res.status(500).send("Somthing went wrong");
    console.log(err);
  }
};

//Logout
export const logout = async (req, res) => {
  res
    .clearCookie("accessToken", {
      sameSite: "none",
      secure: true,
    })
    .status(200)
    .send("User has been logged out.");
};
