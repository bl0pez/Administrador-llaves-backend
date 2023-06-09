import { Request } from 'express';
import multer, { diskStorage } from 'multer';
import fs from 'fs';

const PATH_STORAGE = `${process.cwd()}/uploads`;

const storage = multer.diskStorage({
    destination: (req: Request, file: Express.Multer.File , cb: (error: Error | null, destination: string) => void) => {
        
        
        cb(null, PATH_STORAGE);
    },
    filename: (req: Request, file: Express.Multer.File, cb: (error: Error | null, filename: string) => void) => {
        

        // con split separamos el nombre del archivo y la extension
        // con pop obtenemos la extension
        const ext = file.originalname.split(".").pop();
        const fileNameRandom = `key-${Date.now()}.${ext}`;
        cb(null, fileNameRandom);
    }
});

const multerMiddleware = multer({ storage });

export default multerMiddleware;