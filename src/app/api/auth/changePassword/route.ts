import { AuthController } from "@/app/modules/auth/auth.controller";
import { AuthValidation } from "@/app/modules/auth/auth.validation";
import { connectDB } from "@/lib/mongodb";
import validateRequest from "@/shared/validateRequest";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {

    await connectDB();

    validateRequest(AuthValidation.changePasswordZodSchema);

    return AuthController.changePassword(req);
}