import { NextRequest, NextResponse } from "next/server";
import { CategoryServices } from "./categories.service"
import { catchAsync } from "@/shared/catchAsync";
import { ICategory } from "./categories.interface";

const getAllCategories = catchAsync(async () => {
    const result = await CategoryServices.getAllCategories();

    return NextResponse.json(result);
});

const createCategory = catchAsync(async (req: NextRequest) => {
    const body = await req.json() as Partial<ICategory>;
    const result = await CategoryServices.createCategory(body);

    return NextResponse.json(result);
});

export const CategoryController = {
    getAllCategories,
    createCategory,
};