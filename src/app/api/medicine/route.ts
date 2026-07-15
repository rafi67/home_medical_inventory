import { MedicineController } from "@/app/modules/medicine/medicine.controller";
import { MedicineValidation } from "@/app/modules/medicine/medicine.validation";
import { connectDB } from "@/lib/mongodb";
import validateRequest from "@/shared/validateRequest";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
    await connectDB();

    await validateRequest(MedicineValidation.createMedicineZodSchema);

    return MedicineController.createMedicine(req);
}