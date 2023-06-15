import { Schema, model } from 'mongoose';
import { Rol } from '../interface/auth.interface';


const RolSchema = new Schema<Rol>({
    rol: { type: String, required: true, unique: true }
})


export default model<Rol>('Rol', RolSchema);