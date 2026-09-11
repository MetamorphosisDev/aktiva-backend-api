import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
  throw new Error("JWT_SECRET ENV Is Nothing");
}

export interface JwtPayload {
  id: number;
}

export const generateToken = (id: number) => {
  return jwt.sign(
    { id },
    JWT_SECRET,
    {
      expiresIn: "7d",
    }
  );
};

export const verifyToken = (token: string): JwtPayload => {
  return jwt.verify(token, JWT_SECRET) as JwtPayload;
};