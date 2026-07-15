import { model, models, Schema } from "mongoose";
import { CategoryModel, ICategory } from "./categories.interface";


export const categorySchema = new Schema<ICategory, CategoryModel>(
    {
        name: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
        toJSON: {
            virtuals: true,
        },
    },
);

export const Categories = models.Categories as CategoryModel || model<ICategory, CategoryModel>('Categories', categorySchema);