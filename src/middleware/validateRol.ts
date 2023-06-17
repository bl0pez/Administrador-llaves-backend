import { NextFunction, Response } from 'express';
import { URequest } from '../interface';

export const hasRole = (...roles: string[]) => {

    return (req: URequest, res: Response, next: NextFunction) => {
        try {

            //Verificamos que venga el usuario en la petición
            if (!req.user) {
                return res.status(500).json({
                    ok: false,
                    msg: 'Se intento verificar el rol sin validar el token primero'
                });
            }

            if(!roles.includes(req.user.role)){
                return res.status(401).json({
                    ok: false,
                    msg: `El servicio requiere uno de estos roles ${roles}`
                })
            }

            next();

            
        } catch (error) {
            
            res.status(500).json({
                ok: false,
                msg: 'Se intento verificar el rol sin validar el token primero'
            })

        }
       

    }

}