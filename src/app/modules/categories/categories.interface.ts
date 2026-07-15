import { Model } from "mongoose";


export type ICategory = {
    description: string;
    name: string;
}




export type CategoryModel = Model<ICategory, Record<string, unknown>>;