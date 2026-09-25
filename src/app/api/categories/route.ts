import { CategoryController } from "@/app/modules/categories/categories.controller";
import { CategoryValidation } from "@/app/modules/categories/categories.validation";
import { connectDB } from "@/lib/mongodb";
import { tokenVerification } from "@/lib/tokenVerification";
import validateRequest from "@/shared/validateRequest";
import { NextRequest } from "next/server";

export async function GET() {
    await tokenVerification();

    await connectDB();
    return CategoryController.getAllCategories();
}

export async function POST(req: NextRequest) {
    await tokenVerification();

    await connectDB();

    await validateRequest(CategoryValidation.createCategoryZodSchema);

    return CategoryController.createCategory(req);
}