import { apiHandler } from "@/lib/apiHandler";
import { apiError, apiSuccess } from "@/lib/response";
import { rateLimit } from "@/lib/rateLimit";
import { Admin } from "@/models/Admin";
import bcrypt from "bcryptjs";
import { signAccessToken, signRefreshToken } from "@/lib/auth";
import { validate } from "@/lib/validators";
import { loginSchema } from "@/schemas/login";

export const POST = apiHandler(
  async (req) => {
    // Rate limit
    rateLimit(req, { windowMs: 60_000, max: 5 });

    // Validate input
    const body = await req.json();
    const { email, password } = validate(loginSchema, body);

    // Check admin
    const admin = await Admin.findOne({ email });
    if (!admin) {
      return apiError("Invalid credentials", 401);
    }

    const isValid = await bcrypt.compare(password, admin.password);
    if (!isValid) {
      return apiError("Invalid credentials", 401);
    }

    // Create tokens
    const payload = { adminId: admin._id.toString(), email: admin.email };
    const accessToken = signAccessToken(payload);
    const refreshToken = signRefreshToken(payload);

    return apiSuccess({
      accessToken,
      refreshToken,
    });
  },
  {
    rateLimit: { windowMs: 60_000, max: 5 },
  },
);
