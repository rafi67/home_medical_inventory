import z from "zod";

const loginZodSchema = z.object({
    body: z.object({
        email: z.email("Email is required"),
        password: z.string("Password required."),
    }),
});

const refreshTokenZodSchema = z.object({
    cookies: z.object({
        refreshToken: z.string("Refresh Token is required"),
    }),
});

const changePasswordZodSchema = z.object({
    body: z.object({
        oldPassword: z.string('Old password is required'),
        newPassword: z.string('New password is required'),
    }),
});

export const AuthValidation = {
    loginZodSchema,
    refreshTokenZodSchema,
    changePasswordZodSchema,
};