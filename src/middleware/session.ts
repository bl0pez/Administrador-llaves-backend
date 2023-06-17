import { NextFunction, Response } from 'express';

import User from '../models/user';
import { verifyToken } from '../helper/jwt';
import { URequest } from '../interface';

export const checkJwt = async(req: URequest, res: Response, next: NextFunction) => {
    try {
        
        //Obtenemos el token
        const token = req.headers.authorization || '';
        
        //Verificamos que el token exista
        if(!token){
            return res.status(401).json({
                ok: false,
                msg: 'No hay token en la petición'
            });
        }

        //Verificamos que el token sea válido
        const payload = await verifyToken(token);

        //Buscamos el usuario en la BD
        const user = await User.findById(payload._id);

        //Verificamos que el usuario exista
        if(!user){
            return res.status(401).json({
                ok: false,
                msg: 'Token no válido - usuario no existe en la BD'
            });
        }

        
        //Enviamos el usuario en la petición
        req.user = user;
        next();


    } catch (error) {
 
        res.status(500).json({
            ok: false,
            msg: 'Error al validar el token'
        })

    }

}