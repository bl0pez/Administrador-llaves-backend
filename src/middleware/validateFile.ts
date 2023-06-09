import { NextFunction, Request, Response } from "express";

/**
 * 
 * @param req - Request
 * @param res - Response
 * @param next - NextFunction
 * @returns - Response | NextFunction
 * @description - Valida que exista un archivo en la petición
 */
export const validateFile = (req: Request, res: Response, next: NextFunction) => {

    if (!req.files || Object.keys(req.files).length === 0 || !req.files.image) {
        return res.status(400).json({
            ok: false,
            msg: 'No hay archivos que subir'
        });
    }

    next();

}