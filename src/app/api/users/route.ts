// /app/api/users/route.ts (for Next.js 13+ app dir)
import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
  try {
    const users = await prisma.user.findMany();
    return NextResponse.json(users);
  } catch (err) {
    return NextResponse.json({ error: "Failed to fetch users" }, { status: 500 });
  }
}
