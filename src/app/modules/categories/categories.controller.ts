import { NextResponse } from "next/server";
import { CategoryServices } from "./categories.service"
import { catchAsync } from "@/shared/catchAsync";

const getAllCategories = catchAsync(async () => {
    const result = await CategoryServices.getAllCategories();

    return NextResponse.json(result);
});

export const CategoryController = {
    getAllCategories,
};