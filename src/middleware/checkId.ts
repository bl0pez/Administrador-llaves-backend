import { NextFunction, Response } from 'express';
import { ExtReqKey } from '../interface';

import keys from '../models/keys';

export const checkId = async(req: ExtReqKey, res: Response, next: NextFunction) => {
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
    const key = await keys.findById(req.params.id);

    if(!key){
        return res.status(400).json({
            ok: false,
            msg: 'Llave no encontrada'
        });
    }

    //Guardamos la llave en el request
    req.key = key;
    next();


};
