import path from 'path';
import fs from 'fs';
import { Request, Response } from 'express';
import { uploadFile } from '../helper';
import Item from '../models/item';
import { IKey } from '../middleware/checkId';
import { URequest } from '../interface/request.interface';

const createKey = async (req: URequest, res: Response) => {
    try {

        const { name, description } = req.body;

        const nameFile = await uploadFile(req.files as any);

        const responseItem = await Item.create({
            name,
            description,
            user: req.user?._id,
            image: nameFile
        });

        res.status(200).json({
            ok: true,
            key: responseItem,
            msg: `Llave creada con exito ${nameFile}`,
        })






    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado al crear la llave'
        });
    }

}

const updateItem = async (req: Request, res: Response) => {
    try {

        //Extraemos los datos del middleware y del body
        const { key, body } = req as IKey;

        console.log(key.image);



        if (req.files) {

            //Creamos el path de la imagen
            const pathImage = path.join(__dirname, '..', 'uploads', key.image);

            //Eliminamos la imagen anterior
            fs.unlinkSync(pathImage);

            //Subimos la nueva imagen
            const nameFile = await uploadFile(req.files as any);
            req.body.image = nameFile;

            //Actualizamos la llave
            const newItem = await Item.findByIdAndUpdate(req.params.id, req.body, { new: true });

            return res.status(200).json({
                ok: true,
                msg: 'Llave actualizada',
                key: newItem
            });

        }

        const newItem = await Item.findByIdAndUpdate(req.params.id, req.body, { new: true });

        return res.status(200).json({
            ok: true,
            msg: 'Llave actualizada',
            key: newItem
        })


    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado'
        });
    }
}

const getItems = async (req: Request, res: Response) => {
    try {

        //Obtenemos las llaves de la base de datos por orden de la mas nueva a la mas vieja
        const response = await Item.find().sort({ _id: -1 }).populate('user', 'name');
        res.status(200).json({
            ok: true,
            msg: 'Llaves obtenidas con exito',
            keys: response
        });

    } catch (error) {

        res.status(500).json({
            ok: false,
            msg: 'Error inesperado'
        });

    }
}

/**
 * Elimina una llave de la base de datos y 
 * la imagen asociada a la misma
 * @param req 
 * @param res 
 */
const deleteItem = async (req: Request, res: Response) => {
    try {

        const { key } = req as IKey;
        const pathImage = path.join(__dirname, '..', 'uploads', key.image);
        const response = await Item.findByIdAndDelete(req.params.id);

        if (response!.image) {
            fs.unlinkSync(pathImage);
        }
        

        res.status(200).json({
            ok: true,
            msg: `Llave eliminada con exito, ${key.name}`,
            key: response
        });

    } catch (error) {

        res.status(500).json({
            ok: false,
            msg: 'Error inesperado'
        });

    }
}




export {
    createKey,
    getItems,
    deleteItem,
    updateItem
}