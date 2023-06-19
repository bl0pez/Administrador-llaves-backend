//Retorna true si el id es valido, false si no lo es
export const isIdValid: Function = (id: string): boolean => {
    const regex = new RegExp('^[0-9a-fA-F]{24}$');
    return regex.test(id);
}