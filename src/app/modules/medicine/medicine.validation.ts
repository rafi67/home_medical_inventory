import z, { string } from "zod";

const createMedicineZodSchema = z.object({
    body: z.object({
        name: z.string("Medicine name is required"),
        dosage: z.string("Medicine dosage is required"),
        fixedQuantity: z.number("Medicine fixed quantity required"),
        currentQuantity: z.number("Medicine current quantity is required"),
        unit: z.string("Medicine unit is required"),
        expiryDate: z.date("Medicine expiry date is required"),
        notes: string().optional(),
        userId: string("User id is required"),
    }),
});

const updateMedicineZodSchema = z.object({
    body: z.object({
        name: z.string().optional(),
        dosage: z.string().optional,
        fixedQuantity: z.number().optional,
        currentQuantity: z.number().optional(),
        unit: z.string().optional(),
        expiryDate: z.date().optional(),
        notes: string().optional(),
    }),
});

export const MedicineValidation = {
    createMedicineZodSchema,
    updateMedicineZodSchema,
};