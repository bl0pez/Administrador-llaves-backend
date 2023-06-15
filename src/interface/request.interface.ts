import { Request } from 'express';
import { JwtPayload } from 'jsonwebtoken';
import { Auth } from './auth.interface';


/**
 * Interfaz para agregar el _id del usuario en el objeto Request
 */
export interface UserRequest extends Request {
    user?: string | JwtPayload;
}

export interface URequest extends Request {
    user?: Auth | null;
}

/**
 * Interfaz para agregar campos a la función verify de jsonwebtoken
 */
export interface JwtDecoded extends JwtPayload {
    _id?: string;
    iat?: number;
    exp?: number;
}

export interface idUser {
    _id: string;
}