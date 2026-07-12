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
    user.role = 'USER';

    const result = await User.create(user);

    return result;
};


const createAdmin = async (user: IUser) => {
    const id = await v4();
    user.id = 'A-'+id;
    user.role = 'ADMIN';

    const result = await User.create(user);

    return result;
};

const updateUser = async (id: string, user: IUser) => {
    const filter = { id };

    const result = User.findOneAndUpdate(filter, user, {
        returnDocument: 'after',
    });

    return result;
};

export const UserServices = {
    getUserById,
    createUser,
    updateUser,
};