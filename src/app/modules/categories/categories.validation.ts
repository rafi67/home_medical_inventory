import z from "zod";

const createCategoryZodSchema = z.object({
    body: z.object({
        name: z.string("category name is required."),
        description: z.string("category description is required."),
    }),
});

export const CategoryValidation = {
    createCategoryZodSchema,
};