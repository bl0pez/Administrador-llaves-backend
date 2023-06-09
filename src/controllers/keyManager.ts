import fs from 'fs';
import { Request, Response } from 'express';
import { deleteKey, getKeys, insertKey, updateKey } from '../services/item.service';
import { uploadFile } from '../helper';
import item from '../models/item';

const createKey = async (req: Request, res: Response) => {
    try {

        const { name, description, receivedBy } = req.body;

        if (!req.files || Object.keys(req.files).length === 0 || !req.files.image) {
            return res.status(400).send('No files were uploaded.');
          }
          
        
          const nameFile = await uploadFile(req.files as any);

          const responseItem = await item.create({
                name,
                description,
                receivedBy,
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
                
        if(req.file){


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