import { CategoryController } from "@/app/modules/categories/categories.controller";
import { CategoryValidation } from "@/app/modules/categories/categories.validation";
import { connectDB } from "@/lib/mongodb";
import validateRequest from "@/shared/validateRequest";
import { NextRequest } from "next/server";

export async function GET() {
    await connectDB();
    return CategoryController.getAllCategories();
}

export async function POST(req: NextRequest) {
    await connectDB();
    
    await validateRequest(CategoryValidation.createCategoryZodSchema);

    return CategoryController.createCategory(req);
}