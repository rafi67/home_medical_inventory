import { Categories } from "./categories.model";


const getAllCategories = async () => {
    const result = await Categories.find();
    return result;
};

export const CategoryServices = {
    getAllCategories,
};