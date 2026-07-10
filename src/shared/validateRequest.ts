/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest, NextResponse } from "next/server";
import { ZodObject } from "zod";
const validateRequest = (schema: ZodObject) => async (req: NextRequest) => {
    try {
        await schema.parse({
            body: await req.json(),
        });
    } catch(err: any) {
        return NextResponse.json(
            {
                success: false,
                message: err.message || "Internal Server Error",
            },
            {
                status: err.statusCode || 500,
            },
        );
    }
}

export default validateRequest;