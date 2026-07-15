/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

export const loginUser = async (_currentState: any, formData: any): Promise<any> => {
    try{
        const redirectTo = formData.get('redirect') || null;
        let accessTokenObject: null | any = null;
        let refreshTokenObject: null | any = null;

        const payload = {
            email: formData.get('email'),
            password: formData.get('password'),
        };

        
    } catch(err: any) {
        if(err?.digest?.startWith('NEXT_REDIRECT')) {
            throw err;
        }
        console.log(err);

        return {
            success: false,
            message: `${process.env.NODE_ENV === "development" ? err.message : "Login Failed. You might have entered incorrect email or password"}`,
        };
    }
};