import { NextFunction, Response } from 'express';
import { ExtReqBorrowedKey } from "../../interface";
import { isIdValid } from '../../helper';
import keys from '../../models/keys';

export const checkBodyBKey = async (req: ExtReqBorrowedKey, res: Response, next: NextFunction) => {
    //Verificamos que el id de la llave sea valido
    if (!isIdValid(req.body.key)) {
        return res.status(400).json({
            msg: 'Llave no valida.'
        })
    }

    //Verificamos que la llave exista
    const key = await keys.findById(req.body.key);

    if (!key) {
        return res.status(400).json({
            msg: 'La llave no existe'
        });
    }

    //Verificamos que la llave no este prestada
    if (key.status) {
        return res.status(400).json({
            msg: 'La llave ya esta prestada'
        });
    }

    req.key = key;
    next();
    


}