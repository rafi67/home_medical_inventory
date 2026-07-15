import { catchAsync } from "@/shared/catchAsync";
import { NextRequest, NextResponse } from "next/server";
import { MedicineService } from "./medicine.service";
import { IMedicine } from "./medicine.interface";

const getMedicinesById = catchAsync(async (_req: NextRequest, id: string) => {
    const result = await MedicineService.getMedicinesById(id);

    return NextResponse.json(result);
});

const createMedicine = catchAsync(async (req: NextRequest) => {
    const body = await req.json() as IMedicine;

    const result = await MedicineService.createMedicine(body);

    return NextResponse.json(result);
});

const updateMedicine = catchAsync(async (req: NextRequest, id: string) => {
    const body = await req.json() as IMedicine;

    const result = await MedicineService.updateMedicine(id, body);

    return NextResponse.json(result);
});

const deleteMedicine = catchAsync(async (_req: NextRequest, id: string) => {
    const result = await MedicineService.deleteMedicine(id);

    return NextResponse.json(result);
});


export const MedicineController = {
    getMedicinesById,
    createMedicine,
    updateMedicine,
    deleteMedicine,
};