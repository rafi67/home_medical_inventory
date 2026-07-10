import { v4 } from "uuid";
import { ICategory } from "./categories.interface";
import { Categories } from "./categories.model";


const getAllCategories = async () => {
    const result = await Categories.find();
    return result;
};

const createCategory = async (payload: Partial<ICategory>) => {
    const id: string = await v4();
    payload.id = id;
    const result = await Categories.create(payload);
    return result;
};

export const CategoryServices = {
    getAllCategories,
    createCategory,
};