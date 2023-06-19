import { Request, Response } from 'express';
import BorrowedKey from '../models/BorrowedKey';



const getBorrowedKeys = async (req: Request, res: Response) => {
    try {

        //Obtenemos las llaves prestadas
        const borrowedKeys = await BorrowedKey.find().populate('key', 'name');

        res.json({
            msg: 'get API - getBorrowedKeys',
            borrowedKeys
        })

    } catch (error) {
        res.status(500).json({
            msg: 'Error en el servidor - getBorrowedKeys'
        })

    }
}

const createBorrowedKey = async (req: Request, res: Response) => {
    try {

        //Obtenemos los datos del body
        const body = req.body;

        //Creamos la llave prestada
        const borrowedKey = await BorrowedKey.create(body).then((item) => item.populate('key', 'name'));

        res.json({
            msg: 'post API - createBorrowedKey',
            borrowedKey
        })

    } catch (error) {

        console.log(error);
        res.status(500).json({
            msg: 'Error en el servidor - createBorrowedKey'
        })

    }
}

export {
    createBorrowedKey,
    getBorrowedKeys,
}