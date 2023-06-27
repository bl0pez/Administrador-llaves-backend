import { NextFunction, Request, Response } from "express";
import { Image } from "../interface";

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

    const extensionesValidas = ['png', 'jpg', 'jpeg', 'webp'];

    //Extraemos el archivo
    const img = req.files.image as Image;

    //Extraemos la extension
    const splitName = img.name.split('.');
    const extension = splitName[splitName.length - 1];

    //Validamos la extension
    if (!extensionesValidas.includes(extension)) {
        return res.status(400).json({
            ok: false,
            msg: `Extension ${extension} no permitida - ${extensionesValidas}`
        });
    }

    //Tamaño de la imagen no puede ser mayor de 50kb
    if (img.size > 50000) {
        return res.status(400).json({
            ok: false,
            msg: `El tamaño de la imagen no puede ser mayor de 50kb`
        });
    }

    next();

}