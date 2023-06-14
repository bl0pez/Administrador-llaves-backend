import { NextFunction, Request, Response } from 'express';
import { verifyToken } from '../helper/jwt';
import { UserRequest, JwtDecoded } from '../interface/request.interface';
import jwt from 'jsonwebtoken';

export const checkJwt = async(req: UserRequest, res: Response, next: NextFunction) => {
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
        const payload = token.split(' ')[1];
        const isUser = await verifyToken(payload);
        const { _id } = jwt.decode(payload) as JwtDecoded;

        if(!isUser){
            return res.status(401).json({
                ok: false,
                msg: 'Token no válido'
            });
        }

        //Agregamos el id del usuario a la request
        req.user = _id;
        next();


    } catch (error) {
 
        res.status(500).json({
            ok: false,
            msg: 'Error al validar el token'
        })

    }

}