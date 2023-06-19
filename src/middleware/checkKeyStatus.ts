import { NextFunction, Request, Response } from 'express';
import { ExtReqBorrowedKey } from '../interface';
import keys from '../models/keys';


export const checkKeyStatus = (model: string, status: boolean) => {

    return async (req: ExtReqBorrowedKey, res: Response, next: NextFunction) => {

        


    }
};
