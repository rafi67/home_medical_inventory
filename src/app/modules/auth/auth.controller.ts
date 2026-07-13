import { catchAsync } from "@/shared/catchAsync";
import { RequestHandler } from "next/dist/server/next";
import { NextRequest, NextResponse } from "next/server";
import { AuthService } from "./auth.service";
import { JwtPayload } from "jsonwebtoken";

const loginUser: RequestHandler = catchAsync(async (req: NextRequest) => {
    const { ...loginData } = await req.json();
    
    const result = await AuthService.loginUser(loginData);

    const { refreshToken, accessToken } = result;

    const cookieOptions = {
        secure: process.env.NODE_ENV === 'production',
        httpOnly: true,
    };

    const res = NextResponse.json({
        success: true,
        message: "Login Successful",
    });

    res.cookies.set('refreshToken', refreshToken, cookieOptions);

    res.cookies.set('accessToken', accessToken, cookieOptions);

    return res;
});

const refreshToken: RequestHandler = catchAsync(async (req: NextRequest) => {
    const { value: refreshToken } = await req.cookies.get('refreshToken') || {};

    const result = await AuthService.refreshToken(refreshToken as string);

    const { accessToken } = result;

    const cookieOptions = {
        secure: process.env.NODE_ENV === 'production',
        httpOnly: true,
    };

    const res = NextResponse.json({
        success: true,
        message: "Access Token retrieved successful",
    });

    res.cookies.set('refreshToken', refreshToken, cookieOptions);

    res.cookies.set('accessToken', accessToken, cookieOptions);

    if('refreshToken' in result) {
        delete result.refreshToken;
    }

    return res;
});

const changePassword: RequestHandler = catchAsync(async (req: NextRequest) => {
    const passwordData = await req.json();
    const user = await req.cookies.get('accessToken');

    await AuthService.changePassword(user?.value as string, passwordData);

    return NextResponse.json({
        success: true,
        message: "Successfully Password changed"
    });
});

export const AuthController = {
    loginUser,
    refreshToken,
    changePassword,
};