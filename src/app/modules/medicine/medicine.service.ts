import { v4 } from "uuid";
import { IMedicine } from "./medicine.interface";
import { Medicine } from "./medicine.model";

const getMedicinesById = async (id: string) => {
    const result = await Medicine.find(
        { id: id },
    ).populate('category');

    return result;
};

const getAllMedicines = async (id: string) => {
    const result = await Medicine.find({userId: id}).populate('category');
    const total = await Medicine.countDocuments({userId: id});
    const lowStock = await Medicine.countDocuments({
        $and: [
            { userId: id },
            { currentQuantity: { $lt: 4 } },
        ]
    });
    
    const expired = await Medicine.countDocuments({
        $and: [
            { userId: id },
            { expiryDate: { $gte: new Date() } },
        ]
    });

    return {
        data: result,
        total,
        lowStock,
        expired,
    }
}

const createMedicine = async (payload: IMedicine) => {
    const id = await v4();
    payload.id = 'M-'+id;
    const result = await Medicine.create(payload);
    
    return result;
};

const updateMedicine = async (id: string, payload: IMedicine) => {
    const result = await Medicine.findOneAndUpdate(
        { id },
        { $set: payload },
        { returnDocument: 'after' },
    ).populate('category');

    return result;
};


const deleteMedicine = async(id: string) => {
    const result = await Medicine.deleteOne({ id });

    return result;
}

export const MedicineService = {
    getAllMedicines,
    getMedicinesById,
    createMedicine,
    updateMedicine,
    deleteMedicine,
};