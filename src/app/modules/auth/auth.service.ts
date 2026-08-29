import { ApiError } from "@/error/error";
import { User } from "../users/users.model";
import { IChangePassword, ILoginUser, ILoginUserResponse, IRefreshTokenResponse, IRegisterUser } from "./auth.interface";
import httpStatus from "http-status";
import { jwtHelpers } from "@/helpers/jwtHelpers";
import { Secret } from "jsonwebtoken";
import bcrypt from "bcrypt";
import { UserServices } from "../users/users.service";
import { IUser } from "../users/users.interface";


const loginUser = async(payload: ILoginUser): Promise<ILoginUserResponse> => {
    const { email, password } = payload;

    const isUserExists = await User.isUserExists(email, undefined);

    const { id: userId, role, needsPasswordChange } = isUserExists;

    if(!isUserExists) {
        throw new ApiError("User doesn't exists", httpStatus.NOT_FOUND);
    }

    if(isUserExists.password && !(await User.isPasswordMatched(password, isUserExists?.password))) {
        throw new ApiError("Password is incorrect", httpStatus.UNAUTHORIZED);
    }

    const accessToken = jwtHelpers.createToken(
        {
            id: userId,
            role: role,
        },
        process.env.JWT_SECRET as Secret,
        {
            expiresIn: process.env.JWT_EXPIRES_IN,
        },
    );

    const refreshToken = jwtHelpers.createToken(
        {
            id: userId,
            role: role,
        },
        process.env.JWT_REFRESH_SECRET as Secret,
        {
            expiresIn: process.env.JWT_REFRESH_EXPIRES_IN,
        },
    );

    return {
        accessToken,
        refreshToken,
        needsPasswordChange,
    };
};

const refreshToken = async (token: string): Promise<IRefreshTokenResponse> => {
    let verifiedToken = null;

    try{
        verifiedToken = jwtHelpers.verifyToken(token, process.env.JWT_REFRESH_SECRET as Secret);
    } catch(err) {
        throw new ApiError("Invalid Refresh Token", httpStatus.FORBIDDEN);
    }

    const { id } = verifiedToken;

    const isUserExists = await User.isUserExists(undefined, id);

    if(!isUserExists) {
        throw new ApiError("User does not exists", httpStatus.NOT_FOUND);
    }

    const newAccessToken = jwtHelpers.createToken(
        {
            id: isUserExists.id,
            role: isUserExists.role,
        },
        process.env.JWT_SECRET as Secret,
        {
            expiresIn: process.env.JWT_EXPIRES_IN,
        },
    );

    return {
        accessToken: newAccessToken,
    };
};

const registerUser = async (payload: IRegisterUser): Promise<ILoginUserResponse> => {
    const { name, email, password, confirmPassword } = payload;

    const isUserExists = await User.isUserExists(email, undefined);

    if(isUserExists) {
        throw new ApiError("User Exists", httpStatus.CONFLICT);
    }

    if(password!==confirmPassword) {
        throw new ApiError("Wrong Password", httpStatus.BAD_REQUEST);
    }

    const newUser = {
        name,
        role: 'USER',
        email,
        password,
        needsPasswordChange: true,
    }

    const createUser = await UserServices.createUser(newUser as IUser);

    const accessToken = jwtHelpers.createToken(
        {
            id: createUser.id,
            role: createUser.role,
        },
        process.env.JWT_SECRET as Secret,
        {
            expiresIn: process.env.JWT_EXPIRES_IN,
        },
    );

    const refreshToken = jwtHelpers.createToken(
        {
            id: createUser.id,
            role: createUser.role,
        },
        process.env.JWT_REFRESH_SECRET as Secret,
        {
            expiresIn: process.env.JWT_REFRESH_EXPIRES_IN,
        },
    );

    return {
        accessToken,
        refreshToken,
        needsPasswordChange: createUser.needsPasswordChange,
    };
}; 

const changePassword = async (
    token: string,
    payload: IChangePassword,
): Promise<void> => {
    const { oldPassword, newPassword } = payload;

    let verifiedToken = null;

    try{
        verifiedToken = jwtHelpers.verifyToken(token, process.env.JWT_SECRET as Secret);
    } catch(err) {
        throw new ApiError("Invalid Refresh Token", httpStatus.FORBIDDEN);
    }

    const user = verifiedToken;

    const isUserExists = await User.isUserExists(undefined, user?.id);

    if(!isUserExists) {
        throw new ApiError("User does not exists", httpStatus.NOT_FOUND);
    }

    if(isUserExists.password && !(await User.isPasswordMatched(oldPassword, isUserExists.password))) {
        throw new ApiError("Password is incorrect", httpStatus.UNAUTHORIZED);
    }

    const newHashedPassword = await bcrypt.hash(
        newPassword,
        Number(process.env.BCRYPT_SALT_ROUNDS),
    );

    const query = { id: user?.id };

    const updatedData = {
        password: newHashedPassword,
        needsPasswordChange: false,
        passwordChangeAt: new Date(),
    };

    await User.findOneAndUpdate(query, updatedData);
};

export const AuthService = {
    loginUser,
    registerUser,
    refreshToken,
    changePassword,
};