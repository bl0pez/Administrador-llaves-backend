import path from 'path';
import { v4 as uuidv4 } from 'uuid';

import { UploadedFile } from 'express-fileupload';
import fs from 'fs';


interface IFile{
    image: UploadedFile
}

/**
 * Valida las extensiones de un archivo y lo sube a la carpeta uploads
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

        //Tamaño de la imagen no puede ser mayor de 50kb
        if (image.size > 50000) {
            return reject(`La imagen no puede ser mayor de 50kb`);
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
/**
 * Elimina un archivo de la carpeta uploads
 * @param nameFile - Nombre del archivo a eliminar
 * @param folder - Carpeta donde se encuentra el archivo
 */
export const deleteFile = (nameFile: string, folder: string = '') => {

    //Creamos el path de la imagen
    const pathImage = path.join(__dirname, '..', 'uploads', folder, nameFile);

    //Eliminamos la imagen anterior
    fs.unlinkSync(pathImage);

}