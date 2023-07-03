
type ValidateFields = {
    expresion: RegExp,
    msg: string
}

// Expresion regular para validar que solo se permitan letras y numeros
export const validarLetrasNumeros:ValidateFields = {
    expresion: /^[a-zA-ZáéíóúÁÉÍÓÚ0-9,.\s]*[a-zA-ZáéíóúÁÉÍÓÚ0-9,.\s]$/,
    msg: 'Carasteres permitidos: letras, numeros, espacios, comas y puntos'
}
