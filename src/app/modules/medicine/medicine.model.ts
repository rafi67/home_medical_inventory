import mongoose, { model, models, Schema } from "mongoose";
import { IMedicine, MedicineModel } from "./medicine.interface";

export const medicineSchema = new Schema<IMedicine, MedicineModel>(
    {
        id: {
            type: String,
            required: true,
            unique: true,
        },
        name: {
            type: String,
            required: true,
            unique: true,
        },
        dosage: {
            type: String,
            required: true,
        },
        category: {
            type: mongoose.Types.ObjectId,
            ref: 'Categories',
            required: true,
        },
        fixedQuantity: {
            type: Number,
            required: true,
        },
        currentQuantity: {
            type: Number,
            required: true,
        },
        unit: {
            type: String,
            required: true,
        },
        expiryDate: {
            type: Date,
            required: true,
        },
        notes: {
            type: String,
        },
        userId: {
            type: String,
            ref: 'User',
            required: true,
        }
    },
    {
        timestamps: true,
        toJSON: {
            virtuals: true,
        },
    },
);

export const Medicine = models.Medicine as MedicineModel || model<IMedicine, MedicineModel>('Medicine', medicineSchema);