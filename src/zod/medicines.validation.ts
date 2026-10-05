import z from "zod";

export const addMedicineValidationZodSchema = z.object({
    name: z.string("Medicine name is required"),
    dosage: z.string('Dosage is required'),
    category: z.string('Category is required'),
    fixedQuantity: z.number('Fixed quantity is required'),
    currentQuantity: z.number('Current quantity is required'),
    unit: z.string('Unit is required'),
    expiryDate: z.date("Expiry Date is required"),
    notes: z.string("Notes are required"),
});

export const updateMedicineValidationZodSchema = z.object({
    _id: z.string('_id is required'),
    name: z.string("Medicine name is required"),
    category: z.string('Category is required'),
    dosage: z.string('Dosage is required'),
    fixedQuantity: z.number('Fixed quantity is required'),
    currentQuantity: z.number('Current quantity is required'),
    unit: z.string('Unit is required'),
    expiryDate: z.date("Expiry Date is required"),
    notes: z.string("Notes are required"),
    userId: z.string('User id is required'),
});