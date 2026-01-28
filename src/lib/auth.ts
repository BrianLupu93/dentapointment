import jwt from "jsonwebtoken";

const ACCESS_SECRET: string = process.env.JWT_ACCESS_SECRET as string;
const REFRESH_SECRET: string = process.env.JWT_REFRESH_SECRET as string;

export function signAccessToken(payload: object) {
  return jwt.sign(payload, ACCESS_SECRET, {
    expiresIn: process.env.JWT_ACCESS_EXPIRES_IN || "15m",
  } as jwt.SignOptions);
}

export function signRefreshToken(payload: object) {
  return jwt.sign(payload, REFRESH_SECRET, {
    expiresIn: process.env.JWT_REFRESH_EXPIRES_IN || "7d",
  } as jwt.SignOptions);
}

export function verifyAccessToken(token: string) {
  return jwt.verify(token, ACCESS_SECRET);
}

export function verifyRefreshToken(token: string) {
  return jwt.verify(token, REFRESH_SECRET);
}
