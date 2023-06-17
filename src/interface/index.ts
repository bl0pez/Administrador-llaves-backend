import { Request } from 'express';
import { JwtPayload } from 'jsonwebtoken';
import { Schema } from 'mongoose';

// ==== Modelos ====

//Modelo de usuario
export interface User {
    _id: string;
    createdAt: string;
    email: string;
    name: string;
    password: string;
    role: string;
    status: boolean;
    updatedAt: string;
}

//Modelo de key
export interface Key {
    _id:         string;
    name:        string;
    description: string;
    user:        Schema.Types.ObjectId;
    createdAt:   string;
    updatedAt:   string;
    image:      string;
    status:      boolean;
}

//Modelo de rol
export interface Rol {
    rol: string;
}

//Modelo de borrowed key
export interface BorrowedKey {
    _id:         string;
    key:         Schema.Types.ObjectId;
    user:        Schema.Types.ObjectId;
    requestedBy: string;
    service:     string;
    createdAt:   string;
    updatedAt:   string;
    status:      boolean;
} 

export interface GetKeys {
    keys: Key[];
}

export interface ExtReqKey extends Request {
    key?: Key;
}

export interface Message {
    ok: boolean;
    user: User;
}

export interface URequest extends Request {
    user?: User | JwtPayload | null;
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