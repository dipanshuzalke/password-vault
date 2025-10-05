import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/mongoose";
import VaultItem from "@/models/VaultItem";
import { getUserFromRequest } from "@/lib/authMiddleware";

export async function GET(req: NextRequest) {
  await dbConnect();
  const user = getUserFromRequest(req);
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const items = await VaultItem.find({ userId: user.id });
  return NextResponse.json(items);
}

export async function POST(req: NextRequest) {
  await dbConnect();
  const user = getUserFromRequest(req);
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { title, username, password, url, notes } = await req.json();
  const item = await VaultItem.create({
    userId: user.id,
    title,
    username,
    password, // already encrypted on client
    url,
    notes,
  });

  return NextResponse.json(item);
}
