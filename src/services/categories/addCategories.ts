/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { serverFetch } from "@/lib/server-fetch";
import { zodValidator } from "@/lib/zodValidator";
import { addCategoryValidationZodSchema } from "@/zod/categories.validation";

export const addCategories = async (_currentState: any, formData: any): Promise<any> => {
    try{

        const payload = {
            name: formData.get('name'),
            description: formData.get('description'),
        };


        const validatedPayload = zodValidator(payload, addCategoryValidationZodSchema);

        if(!validatedPayload.success) {
            return validatedPayload;
        }

        await serverFetch.post("/api/categories", {
            body: JSON.stringify(validatedPayload.data),
            headers: {
                "Content-Type": "application/json",
            },
        });

    } catch(err: any) {
        if(err?.digest?.startsWith('NEXT_REDIRECT')) {
            throw err;
        }

        return {
            success: false,
            message: `${process.env.NODE_ENV === "development" ? err.message : "Failed to add category"}`,
        };
    }
};