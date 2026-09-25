import z from "zod";

export const addCategoryValidationZodSchema = z.object({
    name: z.string("Category name is required"),
    description: z.string().min(4, {
        error: "Description is required and Description must be at least 4 characters long",
    }).max(200, {
        error: "Description must be at most 200 characters long",
    }),
});