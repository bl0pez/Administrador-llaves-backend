import { Schema, model } from 'mongoose';
import { Key } from '../interface/key.interface';

const ItemSchema = new Schema<Key>({
    name: { type: String, required: true },
    description: { type: String, required: true },
    receivedBy: { type: String, required: true },
    image: { type: String, required: false }
}, {
    timestamps: true,
    versionKey: false
});

export default model<Key>('Key', ItemSchema);