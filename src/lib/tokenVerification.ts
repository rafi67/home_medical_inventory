import { cookies } from "next/headers"
import { NextResponse } from "next/server";

export const tokenVerification = async () => {
    const cookieStore = await cookies();

    const tokenObj = cookieStore.get('accessToken');
    const token = tokenObj?.value;
    
    if(!token){
        return NextResponse.json(
            {
                error: 'Unauthorized: No token found',
            },
            {
                status: 401,
            },
        );
    }
    
    return token;
}