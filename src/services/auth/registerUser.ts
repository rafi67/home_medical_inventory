/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { serverFetch } from "@/lib/server-fetch";
import { zodValidator } from "@/lib/zodValidator";
import { registerUserValidationZodSchema } from "@/zod/auth.validation";
import { parseCookie } from "cookie";
import { setCookie } from "./tokenHandlers";
import jwt, { JwtPayload } from "jsonwebtoken";
import { getDefaultDashboardRoute, isValidRedirectForRole } from "@/lib/auth-utils";
import { redirect } from "next/navigation";

export const registerUser = async (_currentState: any, formData: any): Promise<any> => {
    try{
        const redirectTo = "/dashboard";
        let accessTokenObject: null | any = null;
        let refreshTokenObject: null | any = null;
        const payload = {
            name: formData.get('name'),
            email: formData.get('email'),
            password: formData.get('password'),
            confirmPassword: formData.get('confirmPassword'),
        };

        const validatedPayload = zodValidator(payload, registerUserValidationZodSchema);

        if(!validatedPayload.success) {
            return validatedPayload;
        }

        const res = await serverFetch.post("/api/auth/register", {
            body: JSON.stringify(validatedPayload.data),
            headers: {
                "Content-Type": "application/json",
            },
        });

        const result = await res.json();

        const setCookieHeaders = res.headers.getSetCookie();

        if(setCookieHeaders && setCookieHeaders.length > 0) {
            setCookieHeaders.forEach((cookie: string) => {
                const parsedCookie = parseCookie(cookie);

                if(parsedCookie['accessToken']) {
                    accessTokenObject = parsedCookie;
                }

                if(parsedCookie['refreshToken']) {
                    refreshTokenObject = parsedCookie;
                }
            });
        } else {
            throw new Error("No Set-Cookie header found");
        }

        await setCookie("accessToken", accessTokenObject.accessToken, {
            secure: true,
            httpOnly: true,
            maxAge: parseInt(accessTokenObject['maxAge']) || 1000 * 60 * 60,
            path: accessTokenObject.Path || "/",
            sameSite: accessTokenObject['sameSite'] || "none",
        });
        
        await setCookie("refreshToken",
            refreshTokenObject.refreshToken, {
                secure: true,
                httpOnly: true,
                maxAge: parseInt(refreshTokenObject['maxAge']) || 1000 * 60 * 60 * 24 * 90,
                path: refreshTokenObject.Path || "/",
                sameSite: refreshTokenObject['sameSite'] || "none",
            });

        const verifiedToken: JwtPayload | string = jwt.verify(accessTokenObject.accessToken, process.env.JWT_SECRET as string);

        if(typeof verifiedToken === "string") {
            throw new Error("Invalid Token");
        }
            
        const userRole = verifiedToken.role;

        // if(!result.success) {
        //     throw new Error(result.message || "Registration Failed");
        // }

        if(redirectTo) {
            const requestedPath = redirectTo.toString();

            if(isValidRedirectForRole(requestedPath, userRole)) {
                redirect(`${requestedPath}?loggedIn=true`);
            } else {
                redirect(`${getDefaultDashboardRoute(userRole)}?loggedIn=true`);
            }
        } else {
            redirect(`${getDefaultDashboardRoute(userRole)}?loggedIn=true`);
        }
            
    } catch(err: any) {
        if(err?.digest?.startsWith('NEXT_REDIRECT')) {
            throw err;
        }
        console.log(err);

        return {
            success: false,
            message: `${process.env.NODE_ENV === "development" ? err.message : "Login Failed. You might have entered incorrect password"}`,
        };
    }
};