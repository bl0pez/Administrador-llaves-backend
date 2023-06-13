import { NextFunction, Request, Response } from 'express';
import { verifyToken } from '../helper/jwt';

export const checkJwt = (req: Request, res: Response, next: NextFunction) => {
    try {
        
        const jwt = req.headers.authorization || '';

        const payload = jwt.split('.')[1];

        const isOk = verifyToken(payload);

        if(!isOk){
            return res.status(401).json({
                ok: false,
                msg: 'Token no válido'
            });
        }

        next();


    } catch (error) {
        
        res.status(500).json({
            ok: false,
            msg: 'Token no válido'
        })

    }

}