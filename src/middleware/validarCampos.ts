import { Request, Response, NextFunction } from 'express';


/**
 * Middleware para validar que los campos no esten vacios
 * @param campos - Array de strings con los nombres de los campos a validar
 * @returns 
 */
export const validarCampos = (...campos: string[]) => {
    return (req:Request, res: Response, next: NextFunction) => {

        //Verificar que los campos no esten vacios
        if(!campos.every( campo => req.body[campo] !== '')){
            return res.status(400).json({
                ok: false,
                msg: 'Todos los campos son obligatorios'
            });
        }

        const regex = /^\S.*\S$/;

        //Verificar que los campos no empiecen ni terminen con espacios
        if(!campos.every( campo => regex.test(req.body[campo]))){
            return res.status(400).json({
                ok: false,
                msg: 'Los campos no pueden empezar ni terminar con espacios'
            });
        }
                
        next();

    }
}