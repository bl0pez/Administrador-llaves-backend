import { Request, Response, NextFunction } from 'express';



export const validarCampos = (...campos: string[]) => {
    return (req:Request, res: Response, next: NextFunction) => {

        console.log(typeof req.body);

        //Validamos que todos los campos vengan en la petición
        
        

        next();

    }
}