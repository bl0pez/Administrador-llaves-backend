import { Schema, model } from 'mongoose';
import { Key } from '../interface';

const KeySchema = new Schema<Key>({
    name: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String, required: false },
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
}, {
    timestamps: true,
    versionKey: false
});

export default model<Key>('Key', KeySchema);