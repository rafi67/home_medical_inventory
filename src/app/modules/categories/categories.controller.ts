import { NextResponse } from "next/server";
import { CategoryServices } from "./categories.service"

const getAllCategories = async () => {
    const result = await CategoryServices.getAllCategories();

    return NextResponse.json(result);
};

export const CategoryController = {
    getAllCategories,
};