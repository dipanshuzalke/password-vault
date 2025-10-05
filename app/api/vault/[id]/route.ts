import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/mongoose";
import VaultItem from "@/models/VaultItem";
import { getUserFromRequest } from "@/lib/authMiddleware";

export async function GET(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;
  await dbConnect();

  const user = getUserFromRequest(req);
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const item = await VaultItem.findOne({ _id: id, userId: user.id });
  if (!item) return NextResponse.json({ error: "Not found" }, { status: 404 });

  return NextResponse.json(item);
}

export async function PUT(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;
  await dbConnect();

  const user = getUserFromRequest(req);
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json();
  const item = await VaultItem.findOneAndUpdate(
    { _id: id, userId: user.id },
    body,
    { new: true }
  );

  return NextResponse.json(item);
}

export async function DELETE(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;
  await dbConnect();

  const user = getUserFromRequest(req);
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  await VaultItem.findOneAndDelete({ _id: id, userId: user.id });
  return NextResponse.json({ success: true });
}
