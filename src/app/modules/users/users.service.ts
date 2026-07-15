import { v4 } from "uuid";
import { IUser } from "./users.interface";
import { User } from "./users.model";

const getUserById = async (id: string) => {
    const result = await User.findOne({ id });
    
    return result;
};

const createUser = async (user: IUser) => {
    const id = await v4();
    user.id = 'U-'+id;

    const result = await User.create(user);

    result.password = "";

    return result;
};

const updateUser = async (id: string, user: IUser) => {
    const filter = { id };
    const result = await User.
    findOneAndUpdate(filter, user, {
        returnDocument: 'after',
    });

    return result;
};

const deleteUser = async (id: string) => {
    const result = await User.findOneAndDelete({ id });

    return result;
};

export const UserServices = {
    getUserById,
    createUser,
    updateUser,
    deleteUser,
};