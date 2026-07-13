import { model, models, Schema } from "mongoose";
import { IUser, UserModel } from "./users.interface";
import bcrypt from 'bcrypt';

const userSchema = new Schema<IUser, UserModel>(
    {
        id: {
            type: String,
            required: true,
            unique: true,
        },
        name: {
            type: String,
            required: true,
        },
        role: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
            select: 0,
        },
        needsPasswordChange: {
            type: Boolean,
            default: true,
        },
        passwordChangedAt: {
            type: Date,
        },
        photoUrl: {
            type: String,
        },
    },
    {
        timestamps: true,
        toJSON: {
            virtuals: true,
        },
    },
);

userSchema.statics.isUserExists = async function (email?: string, id?: string): Promise<Pick<IUser, 'id' | 'password' | 'role' | 'needsPasswordChange'> | null> {
    if(email) {
        return await User.findOne(
            { email },
            { id: 1, email: 1, password: 1, role: 1, needsPasswordChange: 1 },
        );
    } else {
        return await User.findOne(
            { id },
            { id: 1, email: 1, password: 1, role: 1, needsPasswordChange: 1 },
        );
    }
    
}

userSchema.statics.isPasswordMatched = async function (
    givenPassword: string,
    savedPassword: string,
): Promise<boolean> {
    return await bcrypt.compare(givenPassword, savedPassword);
};

userSchema.pre('save', async function () {
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const user = this;

    user.password = await bcrypt.hash(
        user.password,
        Number(process.env.BCRYPT_SALT_ROUNDS),
    );
});

export const User = models.User as UserModel || model<IUser, UserModel>('User', userSchema);