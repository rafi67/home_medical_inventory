/* eslint-disable @typescript-eslint/no-explicit-any */
// src/lib/catchAsync.ts

import { NextRequest, NextResponse } from "next/server";

type AsyncHandler = (
  req: NextRequest,
  context?: any
) => Promise<Response>;

export function catchAsync(handler: AsyncHandler) {
  return async (req: NextRequest, context?: any) => {
    try {
      return await handler(req, context);
    } catch (error: any) {
      console.error(error);

      return NextResponse.json(
        {
          success: false,
          message: error.message || "Internal Server Error",
        },
        {
          status: error.statusCode || 500,
        }
      );
    }
  };
}