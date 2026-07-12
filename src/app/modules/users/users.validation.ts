import z from "zod";

const createUserZodSchema = z.object({
    body: z.object({
        name: z.string("name is required"),
        role: z.string("role is required"),
        password: z.string("password is required"),
        needsPasswordChange: z.boolean().optional(),
        photoUrl: z.string().optional(),
    }),
});

const updateUserZodSchema = z.object({
    body: z.object({
        name: z.string().optional(),
        role: z.string().optional(),
        password: z.string().optional(),
        needsPasswordChange: z.boolean().optional(),
        passwordChangedAt: z.string().optional(),
        photoUrl: z.string().optional(),
    }),
});

export const UserValidation = {
    createUserZodSchema,
    updateUserZodSchema,
};