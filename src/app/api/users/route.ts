import { UsersController } from "@/app/modules/users/users.controller";
import { UserValidation } from "@/app/modules/users/users.validation";
import { connectDB } from "@/lib/mongodb";
import validateRequest from "@/shared/validateRequest";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
    await connectDB();

    await validateRequest(UserValidation.createUserZodSchema);

    return UsersController.createUser(req);
}