import { Schema, model } from 'mongoose';
import { BorrowedKey } from '../interface';

const BorrowedKeySchema = new Schema<BorrowedKey>({
    key: { type: Schema.Types.ObjectId, ref: 'Key', required: true },
    operator: { type: String, required: true },
    requestedBy: { type: String, required: true },
    service: { type: String, required: true },
    status: { type: Boolean, required: true, default: true }
},{
    timestamps: true,
    versionKey: false
});

export default model<BorrowedKey>('BorrowedKey', BorrowedKeySchema);