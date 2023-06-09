import { NextFunction, Request, Response } from 'express';
import { UploadedFile } from "express-fileupload";
import { v4 as uuidv4 } from 'uuid';
import path from 'path';


interface IFile{
    image: UploadedFile
}

/**
 * 
 * @param file - Archivo a subir
 * @param validExtension - Extensiones validas
 * @param folder - Carpeta donde se guardara el archivo
 * @returns - Nombre del archivo subido
 * @throws - Error si la extension no es valida
 * @example - uploadFile(file, ['png', 'jpg', 'jpeg', 'webp'], 'keys')
 */
export const uploadFile = (file: IFile, validExtension: string[] = ['png', 'jpg', 'jpeg', 'webp'], folder: string = '') => {

    return new Promise((resolve, reject) => {

        //Extraemos el archivo
        const { image } = file;
        
        //Extraemos la extension
        const splitName = image.name.split('.');
        const extension = splitName[splitName.length - 1];

        //Validamos la extension
        if (!validExtension.includes(extension)) {
            return reject(`La extensión ${extension} no es válida`);
        }

        //Generamos el nombre del archivo
        const nameTemp = uuidv4() + '.' + extension;

        //Creamos la ruta donde se guardara el archivo
        const uploadPath = path.join(__dirname, '../uploads/', folder, nameTemp);

        image.mv(uploadPath, (err:any) => {

            if (err) reject(err.message);

            resolve(nameTemp);

        });

    });

}