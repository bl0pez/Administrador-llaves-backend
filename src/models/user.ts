import { Schema, model } from 'mongoose';
import { User } from '../interface';

const UserSchema = new Schema<User>({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, required: true, default: 'USER_ROLE', enum: ['ADMIN_ROLE', 'OPERADOR_ROLE', 'USER_ROLE'] },
    status: { type: Boolean, required: true, default: false },
    delete: { type: Boolean, required: true, default: false }
}, {
    timestamps: true,
    versionKey: false
});

UserSchema.methods.toJSON = function () {
    const { password, ...user } = this.toObject();
    return user;
}

export default model<User>('User', UserSchema);