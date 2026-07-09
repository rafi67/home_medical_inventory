import mongoose from "mongoose";
import dns from "dns";

const db_url = process.env.DB_URL;

export async function connectDB() {
    if(mongoose.connection.readyState >=1) {
        return;
    }

    dns.setServers(['8.8.8.8', '8.8.4.4']); 

    await mongoose.connect(db_url as string);
}