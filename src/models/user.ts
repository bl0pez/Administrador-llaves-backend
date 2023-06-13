import { Schema, model } from "mongoose";
import { Auth } from "../interface/auth.interface";

const UserSchema = new Schema<Auth>({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }
}, {
    timestamps: true,
    versionKey: false
});

UserSchema.methods.toJSON = function () {
    const { password, ...user } = this.toObject();
    return user;
}

export default model<Auth>('User', UserSchema);