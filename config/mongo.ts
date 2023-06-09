import 'dotenv/config';
import { connect } from 'mongoose';

async function dbConnect(): Promise<void>{

    console.log(process.env.MONGO_URL);
    

    try {
        const DB_URL = <string>process.env.MONGO_URL;
        connect(DB_URL);
        console.log("Conectado a la base de datos");
    } catch (error:any) {
        console.log(error);
        console.log("Error al conectar con la base de datos");
    }
}

export default dbConnect;