import { Request, Response } from 'express';
import BorrowedKey from '../models/BorrowedKey';
import keys from '../models/keys';
import { ExtReqBorrowedKey } from '../interface';


/**
 * Muestra solo las llaves prestadas
 * @param req 
 * @param res 
 */
const getBorrowedKeys = async (req: Request, res: Response) => {
    try {

        //Obtenemos las llaves prestadas
        const borrowedKeys = await BorrowedKey.find({ status: true })
                                              .populate('key', 'name')
                                              .sort({ createdAt: -1 });

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

const getHistoryBorrowedKeys = async (req: Request, res: Response) => {
    try {

        //Obtenemos las llaves prestadas
        const borrowedKeys = await BorrowedKey.find({ status: false })
                                              .populate('key', 'name')
                                              .sort({ createdAt: -1 });

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

const createBorrowedKey = async (req: ExtReqBorrowedKey, res: Response) => {
    try {

        
        //Obtenemos los datos del body
        const body = req.body;
        
        //Creamos la llave prestada
        const [borrowedKey, key] = await Promise.all([
            await BorrowedKey.create(body).then((item) => item.populate('key', 'name')),
            await keys.findByIdAndUpdate(req.key?._id, { status: true }, { new: true })
        ]);

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


const updateBorrowedKey = async (req: ExtReqBorrowedKey, res: Response) => {
    try {

        //Actualizamos el estado de la llave prestada y de la llave
        const [borrowedKey, key] = await Promise.all([
            await BorrowedKey.findByIdAndUpdate(req.params.id, { status: false }, { new: true }).populate('key', 'name'),
            await keys.findByIdAndUpdate(req.borrowedKey?.key, { status: false }, { new: true })
        ]);
    

        res.json({
            msg: 'put API - updateBorrowedKey',
            borrowedKey
        })



    } catch (error) {
        res.status(500).json({
            msg: 'Error en el servidor - updateBorrowedKey'
        })
    }
}

export {
    createBorrowedKey,
    getHistoryBorrowedKeys,
    getBorrowedKeys,
    updateBorrowedKey,
}