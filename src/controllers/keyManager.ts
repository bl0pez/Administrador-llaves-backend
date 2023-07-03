import { Request, Response } from 'express';
import { ExtReqKey, URequest, Image, Key } from '../interface';
import { deleteFile, uploadFile } from '../helper';

import cloudinary from 'cloudinary';

cloudinary.v2.config(process.env.CLOUDINARY_URL!);


import Keys from '../models/keys';

/**
 * Crear una llave y subir la imagen localmente
 * @param req 
 * @param res 
 */
const createKey = async (req: URequest, res: Response) => {
    try {

        const { name, description } = req.body;

        const nameFile = await uploadFile(req.files as any);

        const responseItem = await Keys.create({
            name,
            description,
            user: req.user?._id,
            image: nameFile
        }).then((item) => item.populate('user', 'name'));

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

const updateItem = async (req: ExtReqKey, res: Response) => {
    try {
        if (req.files) {

            //Eliminamos la imagen anterior
            if(req.key?.image){
                deleteFile(req.key?.image);
            }

            //Subimos la nueva imagen
            const nameFile = await uploadFile(req.files as any);
            req.body.image = nameFile;

            //Actualizamos la llave
            const newItem = await Keys.findByIdAndUpdate(req.params.id, req.body, { new: true }).populate('user', 'name');           

            return res.status(200).json({
                ok: true,
                msg: 'Llave actualizada',
                key: newItem
            });

        }

        const newItem = await Keys.findByIdAndUpdate(req.params.id, req.body, { new: true }).populate('user', 'name');

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
        const response = await Keys.find({
            delete: false
        }).sort({ _id: -1 }).populate('user', 'name');
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
const deleteItem = async (req: ExtReqKey, res: Response) => {
    try {

        const { key } = req;
        
        //Cambiamos el estado de la llave
        const response = await Keys.findByIdAndUpdate(req.params.id, { delete: true }, { new: true }).populate('user', 'name');

        //Cambiamos el estado de la llave


        //Por si queremos eliminar la imagen
        //const response = await Keys.findByIdAndDelete(req.params.id);

        // if (response!.image) {
        //     //deleteFile(response!.image);
        //     //Cloudinary
        //     const nameArr = response!.image.split('/');
        //     const name = nameArr[nameArr.length - 1];
        //     const [public_id] = name.split('.');
        //     cloudinary.v2.uploader.destroy(public_id);
        // }
        

        res.status(200).json({
            ok: true,
            msg: `Llave eliminada con exito, ${key?.name}`,
            key: response
        });

    } catch (error) {

        res.status(500).json({
            ok: false,
            msg: 'Error inesperado al eliminar la llave'
        });

    }
}

/**
 * Crea una llave en la base de datos y la imagen se sube a cloudinary
 * @param req 
 * @param res 
 */
const createKeyCloudinary = async (req: URequest, res: Response) => {
    try {

        const { name, description } = req.body;

        const { tempFilePath } = req?.files?.image as Image;

        const resp = await cloudinary.v2.uploader.upload(tempFilePath)
    

        const responseItem = await Keys.create({
            name,
            description,
            user: req.user?._id,
            image: resp.secure_url
        }).then((item) => item.populate('user', 'name'));

        res.status(200).json({
            ok: true,
            key: responseItem,
            msg: `Llave creada con exito`,
        })






    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado al crear la llave'
        });
    }

}

/**
 * Actualiza una llave en la base de datos y la imagen se sube a cloudinary
 * @param req 
 * @param res 
 * @returns 
 */
const updateItemCloudinary = async (req: ExtReqKey, res: Response) => {
    try {
        if (req.files) {

            //Eliminamos la imagen anterior
            if(req.key?.image){
                const nameArr = req.key?.image.split('/');
                const name = nameArr[nameArr.length - 1];
                const [public_id] = name.split('.');
                cloudinary.v2.uploader.destroy(public_id);
            }

            const { tempFilePath } = req?.files?.image as Image;

            const resp = await cloudinary.v2.uploader.upload(tempFilePath)

            req.body.image = resp.secure_url;

            //Actualizamos la llave
            const newItem = await Keys.findByIdAndUpdate(req.params.id, req.body, { new: true }).populate('user', 'name');           

            return res.status(200).json({
                ok: true,
                msg: 'Llave actualizada',
                key: newItem
            });

        }

        const newItem = await Keys.findByIdAndUpdate(req.params.id, req.body, { new: true }).populate('user', 'name');

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


export {
    createKey,
    getItems,
    deleteItem,
    updateItem,
    createKeyCloudinary,
    updateItemCloudinary
}