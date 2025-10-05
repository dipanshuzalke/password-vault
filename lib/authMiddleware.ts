import { NextRequest } from "next/server";
import { verifyToken } from "./auth";

export interface UserPayload {
  id: string;
  email: string;
}

export function getUserFromRequest(req: NextRequest): UserPayload | null {
  const authHeader = req.headers.get("authorization") || req.headers.get("Authorization");
  if (!authHeader) return null;

  const token = authHeader.startsWith("Bearer ") ? authHeader.split(" ")[1] : authHeader;
  if (!token) return null;

  const decoded = verifyToken(token) as UserPayload | null;
  return decoded;
}
