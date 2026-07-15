import { catchAsync } from "@/shared/catchAsync";
import { NextRequest, NextResponse } from "next/server";
import { IUser } from "./users.interface";
import { UserServices } from "./users.service";

const getUserById = catchAsync(async (_req: NextRequest, id: string) => {
    const result = await UserServices.getUserById(id);

    return NextResponse.json(result);
});

const createUser = catchAsync(async (req: NextRequest) => {
    const body = await req.json() as IUser;

    const result = await UserServices.createUser(body);

    return NextResponse.json(result);
});

const updateUser = catchAsync(async (req: NextRequest, id: string) => {
    const body = await req.json() as IUser;

    const result = await UserServices.updateUser(id, body);
    
    return NextResponse.json(result);
});

const deleteUser = catchAsync(async (_req: NextRequest, id: tring) => {
    const result = await UserServices.deleteUser(id);
    
    return NextResponse.json(result);
});

export const UsersController = {
    getUserById,
    createUser,
    updateUser,
    deleteUser,
};