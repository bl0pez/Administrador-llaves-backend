import { Request, Response } from "express";
import BorrowedKey from "../models/BorrowedKey";



const keyHistoryCtrl = async (req: Request, res: Response) => {
    try {

        const [keys, count] = await Promise.all([
            BorrowedKey.find({
                $or: [
                    { status: false },
                    //Ordenar por fecha de prestamo
                ]
            }).populate('key', 'name').sort({ createdAt: -1 }),
            BorrowedKey.countDocuments({
                $or: [
                    { status: false },
                ]
            })
        ])

        res.status(200).json({
            msg: 'Historial de llaves obtenido con exito',
            ok: true,
            keys,
            count
        })



    } catch (error) {
        res.status(500).json({
            msg: 'Error interno al obtener el historial de llaves'
        })
    }
}

export {
    keyHistoryCtrl,
}