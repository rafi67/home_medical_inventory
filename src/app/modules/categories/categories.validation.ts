import z from "zod";

const createCategoryZodSchema = z.object({
    body: z.object({
        name: z.string("category name is required."),
        description: z.string("category description is required."),
    }),
});

const updateCategoryZodSchema = z.object({
    body: z.object({
        name: z.string().optional(),
        description: z.string().optional(),
    }),
});

export const CategoryValidation = {
    createCategoryZodSchema,
    updateCategoryZodSchema,
};