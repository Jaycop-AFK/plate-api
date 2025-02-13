import mongoose, { Schema } from "mongoose";
import { IUser } from "../interfaces/user.interface";


const UserSchema: Schema = new Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
        },
        hashedPassword: {
            type: String,
            required: true,
            select: false,
        },
    },
    {
        timestamps: true,
    }
);

const UserModel = mongoose.model<IUser>("User", UserSchema);

export default UserModel;
