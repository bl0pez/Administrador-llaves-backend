import { hash, compare } from 'bcryptjs';

/**
 * Encripta una contraseña con un salt de 10
 * @param password - Contraseña a encriptar
 * @returns - Contraseña encriptada
 */
const encryptPassword = async(password: string) => {
    const passwordHash = await hash(password, 10);
    return passwordHash;
}

/**
 * Compara una contraseña con una contraseña encriptada
 * @param password - Contraseña a comparar
 * @param passwordHash - Contraseña encriptada
 * @returns - True si la contraseña es correcta, false si no lo es
 */
const comparePassword = async(password: string, passwordHash:string) => {
    const passwordCompare = await compare(password, passwordHash);
    return passwordCompare;
}

export {
    encryptPassword,
    comparePassword
}