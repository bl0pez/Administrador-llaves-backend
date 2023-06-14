import { Request } from 'express';
import { JwtPayload } from 'jsonwebtoken';


/**
 * Interfaz para agregar el _id del usuario en el objeto Request
 */
export interface UserRequest extends Request {
    user?: string | JwtPayload;
}

export interface JwtDecoded {
    _id: string;
    iat: number;
    exp: number;
}