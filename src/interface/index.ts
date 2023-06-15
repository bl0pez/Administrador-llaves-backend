import { Request } from 'express';
import { Schema } from 'mongoose';

export interface ExtReqKey extends Request {
    key?: Key;
}

export interface Key {
    _id:         string;
    name:        string;
    description: string;
    user:        Schema.Types.ObjectId;
    createdAt:   string;
    updatedAt:   string;
    image:      string;
}