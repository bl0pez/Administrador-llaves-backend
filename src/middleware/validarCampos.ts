import { Request, Response, NextFunction } from 'express';


/**
 * Middleware para validar que los campos no esten vacios
 * @param campos - Array de strings con los nombres de los campos a validar
 * @returns 
 */

type ValidateFields = {
    expresion: RegExp,
    msg: string
}

export const validarCampos = (exp: ValidateFields[], campos: string[]) => {
    return (req:Request, res: Response, next: NextFunction) => {

        //Verificar que los campos no esten vacios
        if(!campos.every( campo => req.body[campo] !== '')){
            return res.status(400).json({
                ok: false,
                msg: 'Todos los campos son obligatorios'
            });
        }

        //Verificar que los campos no esten vacios
        if(!campos.every( campo => req.body[campo] !== '')){
            return res.status(400).json({
                ok: false,
                msg: 'Todos los campos son obligatorios'
            });
        }

        //Verificamos todas las expresiones regulares
        for(const expReg of exp){
            if(!campos.every( campo => expReg.expresion.test(req.body[campo]))){
                return res.status(400).json({
                    ok: false,
                    msg: expReg.msg
                });
            }
        }
                
        next();

    }
}