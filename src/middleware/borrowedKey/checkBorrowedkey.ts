import { NextFunction, Response } from 'express';
import { ExtReqBorrowedKey } from '../../interface';
import { isIdValid } from '../../helper';
import BorrowedKey from '../../models/BorrowedKey';

/**
 * Se encarga de verificar que el id de la llave prestada sea valido y que exista
 * @param req 
 * @param res 
 * @param next 
 * @returns - Si todo sale bien, agrega la llave prestada al request y llama al siguiente middleware
 * 
 */
export const checkBorrowedKey = async(req: ExtReqBorrowedKey, res: Response, next: NextFunction) => {
    try {
        //Validamos que venga el id de la llave prestada
        if (!req.params.id) {
            return res.status(400).json({
                msg: 'Seleccione una llave.'
            })
        }


        //Validamos que el id de la llave prestada sea valido
        if (!isIdValid(req.params.id)) {
            return res.status(400).json({
                msg: 'Llave no valida.'
            })
        }

        //Verificamos que la llave prestada exista
        const borrowedKey = await BorrowedKey.findById(req.params.id);

        if (!borrowedKey) {
            return res.status(400).json({
                msg: 'La llave prestada no existe'
            });
        }


        //Agregamos la llave prestada al request
        req.borrowedKey = borrowedKey;
        next();
    } catch (error) {

        res.status(500).json({
            msg: 'Error en el servidor - Middleware checkBorrowedKey'
        })

    }

}