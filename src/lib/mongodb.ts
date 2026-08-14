import mongoose from "mongoose";
import dns from "dns";
import { Categories } from "@/app/modules/categories/categories.model";

const db_url = process.env.DB_URL;

export async function connectDB() {
    if(mongoose.connection.readyState >=1) {
        return;
    }

    dns.setServers(['8.8.8.8', '8.8.4.4']);
    
    Categories;

    await mongoose.connect(db_url as string, {
        dbName: "home_medicine_inventory"
    });
}