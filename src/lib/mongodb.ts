import mongoose from "mongoose";

const db_url = process.env.DB_URL;

export async function connectDB() {
    if(mongoose.connection.readyState >=1) {
        return;
    }

    await mongoose.connect(db_url as string);
}