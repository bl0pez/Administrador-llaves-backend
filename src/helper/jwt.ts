import { sign, verify } from 'jsonwebtoken';


const JWT_SECRET = process.env.JWT_SECRET || 'secret';

export const generateToken = async (_id: string) => {

    const jwt = await sign({ _id }, JWT_SECRET, { expiresIn: '4h' });

    return jwt;

}

export const verifyToken = async (jwt: string) => {

    const isOk = verify(jwt, JWT_SECRET);

    return isOk;

}