import jwt from "jsonwebtoken";
import jwt_decode from "jwt-decode";
import "dotenv/config";

export const verifyToken = (req, res, next) => {
  const token: string = req.token;
  // console.log("Token", token);
  if (!token) {
    console.log("no token");
    return res.status(400).json({ errorMsg: "Token is required" });
  }
  try {
    const data = jwt.verify(token, "secret");
    // req.token = data;
    next();
  } catch (error) {
    console.log(`error verifying token: ${error}`);
    return res.status(400).json({ errorMsg: "Token is not valid", error });
  }
};

export const tokenBelongsToUser = (token: string, userId: string): boolean => {
  let decodedToken: { id: string; email: string };
  try {
    decodedToken = jwt_decode(token);
  } catch (err) {
    console.log;
    return false;
  }
  return decodedToken.id === userId;
};

// async?
export const createAccessToken = (payload: object): string => {
  const expiry: string = "7d";
  return jwt.sign(payload, process.env.SECRET!, { expiresIn: expiry });
};

export const getUserIdFromToken = (token: string): string => {
  const decodedToken: { id: string; email: string } = jwt_decode(token);
  try {
    return decodedToken.id;
  } catch (err) {
    return "";
  }
};
