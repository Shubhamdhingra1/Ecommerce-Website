import JWT from "jsonwebtoken";
import userModel from "../models/userModel.js";

//Protected Routes token base
export const requireSignIn = async (req, res, next) => {
  try {
    console.log("reached in require sign in ");
    const token = req.headers.authorization?.split(" ")[1];
    console.log("token is", token);
    const decode = JWT.verify(token, process.env.JWT_SECRET);
    req.user = decode;
    console.log("user is", JSON.stringify(req.user, null, 2));
    next();
  } catch (error) {
    console.log(error);
  }
};

//admin acceess
export const isAdmin = async (req, res, next) => {
  try {
    console.log("reached in isadmin middleware");
    const user = await userModel.findById(req.user._id);
    console.log("in isadmin user is", JSON.stringify(user, null, 2));
    if (user.role !== 1) {
      return res.status(401).send({
        success: false,
        message: "UnAuthorized Access",
      });
    } else {
      next();
    }
  } catch (error) {
    console.log(error);
    res.status(401).send({
      success: false,
      error,
      message: "Error in admin middelware",
    });
  }
};
