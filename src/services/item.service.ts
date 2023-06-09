import { Key } from '../interface/key.interface';
import Item from '../models/item';

const insertKey = async(item:Key, file:Express.Multer.File) => {
    item.image = file.filename;
    const responseInsert = await Item.create(item);
    return responseInsert;
}

const updateKey = async(id: string, item:Key, file?:Express.Multer.File) => {
    item.image = file ? file.filename : item.image;
    const responseInsert = await Item.findByIdAndUpdate(id, item, {new: true});
    return responseInsert;    
}

const getKeys = async() => {
    const responseGet = await Item.find();
    return responseGet;
}

const deleteKey = async(id:string) => {
    const responseDelete = await Item.findByIdAndDelete(id);
    return responseDelete;
}

export {
    insertKey,
    getKeys,
    deleteKey,
    updateKey,
}