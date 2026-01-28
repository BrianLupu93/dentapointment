import { NextResponse } from "next/server";
import { verifyRefreshToken, signAccessToken } from "@/lib/auth";

export async function POST(req: Request) {
  const { refreshToken } = await req.json();

  if (!refreshToken) {
    return NextResponse.json(
      { error: "Missing refresh token" },
      { status: 400 },
    );
  }

  try {
    const decoded = verifyRefreshToken(refreshToken) as any;

    const payload = { adminId: decoded.adminId, email: decoded.email };
    const newAccessToken = signAccessToken(payload);

    return NextResponse.json({
      accessToken: newAccessToken,
    });
  } catch {
    return NextResponse.json(
      { error: "Invalid refresh token" },
      { status: 401 },
    );
  }
}
