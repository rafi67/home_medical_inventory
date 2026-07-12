import { UsersController } from "@/app/modules/users/users.controller";
import { UserValidation } from "@/app/modules/users/users.validation";
import { connectDB } from "@/lib/mongodb";
import validateRequest from "@/shared/validateRequest";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    await connectDB();

    const { id } = await params;

    return UsersController.getUserById(req, id);
}

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    await connectDB();

    await validateRequest(UserValidation.updateUserZodSchema);

    const { id } = await params;

    return UsersController.updateUser(req, id);
}