import { CategoryController } from "@/app/modules/categories/categories.controller";
import { CategoryValidation } from "@/app/modules/categories/categories.validation";
import { connectDB } from "@/lib/mongodb";
import validateRequest from "@/shared/validateRequest";
import { NextRequest } from "next/server";


export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    await connectDB();

    const { id } = await params;

    await validateRequest(CategoryValidation.updateCategoryZodSchema);

    return CategoryController.updateCategory(req, id);
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    const { id }  = await params;

    return CategoryController.deleteCategory(req, id);
}