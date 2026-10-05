/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { serverFetch } from "@/lib/server-fetch";
import { zodValidator } from "@/lib/zodValidator";
import { updateMedicineValidationZodSchema } from "@/zod/medicines.validation";

export const updateMedicines = async (_currentState: any, formData: any): Promise<any> => {
    try{

        const payload = {
            _id: formData.get('_id'),
            name: formData.get('name'),
            dosage: formData.get('dosage'),
            category: formData.get('category'),
            fixedQuantity: Number(formData.get('fixedQuantity')),
            currentQuantity: Number(formData.get('currentQuantity')),
            unit: formData.get('unit'),
            expiryDate: new Date(formData.get('expiryDate')),
            notes: formData.get('notes'),
            userId: formData.get('userId'),
        };

        const validatedPayload = zodValidator(payload, updateMedicineValidationZodSchema);


        if(!validatedPayload.success) {
            return validatedPayload;
        }

        await serverFetch.patch(`/api/medicine/${payload._id}`, {
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