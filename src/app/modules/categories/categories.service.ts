import { ICategory } from "./categories.interface";
import { Categories } from "./categories.model";


const getAllCategories = async () => {
    const result = await Categories.find();
    return result;
};

const createCategory = async (payload: Partial<ICategory>) => {
    const result = await Categories.create(payload);
    return result;
};

const updateCategory = async (id: string, payload: Partial<ICategory>) => {
    const update = {
        name: payload.name,
        description: payload.description,
    };
    
    const result = await Categories.findByIdAndUpdate(id, update, {
        returnDocument: 'after',
    });

    return result;
};

const deleteCategory = async (id: string) => {
    const result = await Categories.findByIdAndDelete(id);

    return result;
}; 

export const CategoryServices = {
    getAllCategories,
    createCategory,
    updateCategory,
    deleteCategory,
};