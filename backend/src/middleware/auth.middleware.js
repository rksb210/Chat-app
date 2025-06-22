import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

export const protectRoute = async (req, res, next) => {
  try {
    // console.log("aa", req.cookies);
    const token = req.cookies.jwt;
    // console.log("bb", token);

    if (!token) {
      return res
        .status(401)
        .json({ message: "Unauthorizes - No token provided" });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // console.log("decoded", decoded)
    if (!decoded) {
      return res.status(401).json({ message: "Unauthorizes - Invalid Token" });
    }
    const user = await User.findById(decoded.userId).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    // console.log("user",user)
    req.user = user;
        // console.log("req.user",req.user)

    next();
  } catch (error) {
    console.log("Error in protectRoute middleware", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
