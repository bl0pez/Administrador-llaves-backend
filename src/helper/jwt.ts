import { sign, verify } from 'jsonwebtoken';
import { JwtDecoded } from '../interface';


const JWT_SECRET = process.env.JWT_SECRET || 'secret';

/**
 * 
 * @param _id - Id del usuario
 * @returns - Retorna el token
 */
export const generateToken = async (_id: string) => {
    const jwt = sign({ _id }, JWT_SECRET, { expiresIn: '4h' });
    return jwt;
}

/**
 * 
 * @param token - Token a verificar obtenido del header
 * @returns - Retorna el token decodificado
 */
export const verifyToken = async (token: string):Promise<JwtDecoded> => {
    //Recortamos el token
    const jwt = token.split(' ')[1];
    //Verificamos el token
    const isOk = verify(jwt, JWT_SECRET);
    //Retornamos el token decodificado
    return isOk as JwtDecoded;

}