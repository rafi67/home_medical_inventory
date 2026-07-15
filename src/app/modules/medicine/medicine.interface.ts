import mongoose, { Model } from "mongoose";

export type IMedicine = {
    id: string;
    name: string;
    dosage: string;
    category: mongoose.Types.ObjectId;
    fixedQuantity: number;
    currentQuantity: number;
    unit: string;
    expiryDate: Date;
    notes?: string;
    userId: string;
};

export type MedicineModel = Model<IMedicine, Record<string, unknown>>;