import { CategoryController } from "@/app/modules/categories/categories.controller";
import { connectDB } from "@/lib/mongodb";

export async function GET() {
    await connectDB();
    return CategoryController.getAllCategories();
}