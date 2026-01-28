import { NextResponse } from "next/server";
import { Admin } from "@/models/Admin";
import bcrypt from "bcryptjs";
import "@/lib/db";
import { withDB } from "@/lib/withDB";

export const POST = withDB(async () => {
  const email = "admin@email.com";
  const plainPassword = "admin123";

  // Check if exist already
  const existing = await Admin.findOne({ email });
  if (existing) {
    return NextResponse.json(
      { error: "Admin already exists" },
      { status: 400 },
    );
  }

  const password = await bcrypt.hash(plainPassword, 10);
  const admin = await Admin.create({ email, password });

  return NextResponse.json({
    message: "Admin created successfully",
    admin: {
      id: admin._id,
      email: admin.email,
    },
  });
});
