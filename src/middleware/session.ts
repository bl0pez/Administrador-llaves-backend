import { NextFunction, Request, Response } from 'express';
import { verifyToken } from '../helper/jwt';
import { JwtPayload } from 'jsonwebtoken';

interface ExtendedRequest extends Request {
    user?: string | JwtPayload;
}


export const checkJwt = async(req: ExtendedRequest, res: Response, next: NextFunction) => {
    try {
        
        
        const jwt = req.headers.authorization || '';

        console.log(jwt);
        

        if(!jwt){
            return res.status(401).json({
                ok: false,
                msg: 'No hay token en la petición'
            });
        }

        const payload = jwt.split(' ')[1];
        const isUser = await verifyToken(payload);

        //Obtenemos el id del usuario
        const { _id } = isUser as JwtPayload;

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

        console.log(error);
        
        
        res.status(500).json({
            ok: false,
            msg: 'Error al validar el token'
        })

    }

}