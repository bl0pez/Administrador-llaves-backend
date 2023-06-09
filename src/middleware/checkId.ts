import { NextFunction, Request, Response } from 'express';
import Item from '../models/item';
import { Key } from '../interface/key.interface';

export interface IKey extends Request {
    key: Key
}

export const checkId = async(req: Request, res: Response, next: NextFunction) => {
    //Verificamos que tenga el id
    if (!req.params.id) {
        return res.status(400).json({
            ok: false,
            msg: 'No se ha enviado el id'
        });
    }

    //Validamos que sea un id de mongo valido
    if (!req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
        return res.status(400).json({
            ok: false,
            msg: 'El id no es valido'
        });
    }

    //Verificamos que exista el id
    const key = await Item.findById(req.params.id);

    if(!key){
        return res.status(400).json({
            ok: false,
            msg: 'Llave no encontrada'
        });
    }

    //Guardamos la llave en el request
    (req as IKey).key = key;
    next();


};
