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

const updateCategory = async (id: string, payload: Partial<ICategory>) => {
    const filter = { id };
    const update = {
        name: payload.name,
        description: payload.description,
    };
    const result = await Categories.findOneAndUpdate(filter, update, {
        returnDocument: 'after',
    });

    return result;
};

const deleteCategory = async (id: string) => {
    const result = await Categories.deleteOne({ id: id });

    return result;
}; 

export const CategoryServices = {
    getAllCategories,
    createCategory,
    updateCategory,
    deleteCategory,
};