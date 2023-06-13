import { hash, compare } from 'bcryptjs';


const encryptPassword = async(password: string) => {
    const passwordHash = await hash(password, 10);
    return passwordHash;
}

const comparePassword = async(password: string, passwordHash:string) => {
    const passwordCompare = await compare(password, passwordHash);
    return passwordCompare;
}

export {
    encryptPassword,
    comparePassword
}