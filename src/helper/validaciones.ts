
type ValidateFields = {
    expresion: RegExp,
    msg: string
}

// Expresion regular para validar que solo se permitan letras y numeros
export const validarLetrasNumeros:ValidateFields = {
    expresion: /^[a-zA-Z0-9áéíóúÁÉÍÓÚ,\.;]*$/,
    msg: 'Solo se permiten letras y numeros'
}
