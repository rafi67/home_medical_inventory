import { Model } from "mongoose";

export type IUser = {
    id: string;
    name: string;
    role: string;
    email: string;
    password: string;
    needsPasswordChange: true | false;
    passwordChangedAt?: Date;
    photoUrl: string;
};

export type UserModel = {
    isUserExists(
        email?: string,
        id?:string,
    ): Promise<Pick<IUser, 'id' | 'password' | 'role' | 'needsPasswordChange'>>;
    isPasswordMatched(givenPassword, savedPassword): Promise<boolean>;
} & Model<IUser>;