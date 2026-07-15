import { v4 } from "uuid";
import { IMedicine } from "./medicine.interface";
import { Medicine } from "./medicine.model";

const getMedicinesById = async (id: string) => {
    const result = await Medicine.find(
        { id: id },
    ).populate('category');

    const total = await Medicine.countDocuments({ id: id });

    return {
        total,
        data: result,
    };
};

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
    getMedicinesById,
    createMedicine,
    updateMedicine,
    deleteMedicine,
};