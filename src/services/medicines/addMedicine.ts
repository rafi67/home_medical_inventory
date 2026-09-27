/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { serverFetch } from "@/lib/server-fetch";
import { zodValidator } from "@/lib/zodValidator";
import { addMedicineValidationZodSchema } from "@/zod/medicines.validation";

export const addMedicines = async (_currentState: any, formData: any): Promise<any> => {
    try{

        const payload = {
            name: formData.get('name'),
            dosage: formData.get('dosage'),
            category: formData.get('category'),
            fixedQuantity: Number(formData.get('quantity')),
            currentQuantity: Number(formData.get('quantity')),
            unit: formData.get('unit'),
            expiryDate: new Date(formData.get('expiryDate')),
            notes: formData.get('notes'),
        };

        console.log("payload:", payload);


        const validatedPayload = zodValidator(payload, addMedicineValidationZodSchema);

        console.log("validatedPayload:", validatedPayload);

        if(!validatedPayload.success) {
            return validatedPayload;
        }

        await serverFetch.post("/api/medicine", {
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