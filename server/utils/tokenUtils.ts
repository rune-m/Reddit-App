import jwt from "jsonwebtoken";
import jwt_decode from "jwt-decode";

export const validToken = (token: string) => {
  return jwt.verify(token, "secret");
};

export const verifyToken = (
  req,
  res,
  next
  // eslint-disable-next-line consistent-return
) => {
  const token: string = req.token;
  console.log("Token", token);
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
export const createAccessToken = (payload: object) => {
  const expiry: string = "15m";
  return jwt.sign(payload, "secret", { expiresIn: expiry });
};
