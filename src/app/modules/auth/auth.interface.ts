
export type ILoginUser = {
    email: string;
    password: string;
};

export type IRegisterUser = {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
};

export type ILoginUserResponse = {
    accessToken: string;
    refreshToken?: string;
    needsPasswordChange: boolean;
};

export type IRefreshTokenResponse = {
    accessToken: string;
};

export type IChangePassword = {
    oldPassword: string;
    newPassword: string;
};