import { MedicineController } from "@/app/modules/medicine/medicine.controller";
import { MedicineValidation } from "@/app/modules/medicine/medicine.validation";
import { connectDB } from "@/lib/mongodb";
import validateRequest from "@/shared/validateRequest";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    await connectDB();
    
    const { id } = await params;

    await validateRequest(MedicineValidation.createMedicineZodSchema);

    return MedicineController.getMedicinesById(req, id);
}

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    await connectDB();

    const { id } = await params;

    await validateRequest(MedicineValidation.updateMedicineZodSchema);

    return MedicineController.updateMedicine(req, id);
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    await connectDB();

    const { id } = await params;

    return MedicineController.deleteMedicine(req, id);
}