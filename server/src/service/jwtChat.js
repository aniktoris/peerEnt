import jwt from "jsonwebtoken";

export const generateToken = (user) => {
  const payload = {
    id: user.id,
    username: user.username,
  };
  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "24h" });
};

export const authenticateToken = (token) => {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return { id: decoded.id, username: decoded.username };
  } catch (error) {
    return null;
  }
};
