import fs from 'fs';
import { Request, Response } from 'express';
import { deleteKey, getKeys, insertKey, updateKey } from '../services/item.service';

const createKey = async (req: Request, res: Response) => {
    try {
        const { file } = req;

        if (!file) {
            return res.status(400).json({
                ok: false,
                msg: 'No file uploaded'
            });
        }


        

        const responseItem = await insertKey(req.body, file);
        res.status(200).json({
            ok: true,
            msg: 'Key created',
            key: responseItem
        })

    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado'
        });
    }

}

const updateItem = async (req: Request, res: Response) => {
    try {
                
        if(req.file){
            console.log(req.body);
           // fs.unlinkSync(`uploads/${req.body.image}`);
            // const responseItem = await updateKey(req.params.id, req.body, req.file);
            // return res.status(200).json({
            //     ok: true,
            //     msg: 'Llave actualizada',
            //     key: responseItem
            // });

            res.status(200).json({});
        }

        const responseItem = await updateKey(req.params.id, req.body);
        res.status(200).json({
            ok: true,
            msg: 'Llave actualizada',
            key: responseItem
        });
        
            

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
        
        const response = await getKeys();
        res.status(200).json({
            keys:response
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
        
        const response = await deleteKey(req.params.id);
        
        if(response!.image){
            fs.unlinkSync(`uploads/${response!.image}`);
        }
        
        
        res.status(200).json({
            ok: true,
            msg: 'Key deleted',
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