import { Request, Response } from 'express';
import { ExtReqKey, URequest } from '../interface';
import { deleteFile, uploadFile } from '../helper';
import Keys from '../models/keys';

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
        const response = await Keys.find().sort({ _id: -1 }).populate('user', 'name');
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
        const response = await Keys.findByIdAndDelete(req.params.id);

        if (response!.image) {
            deleteFile(response!.image);
        }
        

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




export {
    createKey,
    getItems,
    deleteItem,
    updateItem
}