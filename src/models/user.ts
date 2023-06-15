import { Schema, model } from "mongoose";
import { Auth } from "../interface/auth.interface";

const UserSchema = new Schema<Auth>({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, required: true, default: 'USER_ROLE', enum: ['ADMIN_ROLE', 'OPERADOR_ROLE', 'USER_ROLE'] },
    status: { type: Boolean, required: true, default: false }
}, {
    timestamps: true,
    versionKey: false
});

UserSchema.methods.toJSON = function () {
    const { password, ...user } = this.toObject();
    return user;
}

export default model<Auth>('User', UserSchema);