import * as yup from "yup";


export const schema = yup.object({
    username: yup.string().required('El nombre de usuario es requerido'),
    password: yup
        .string()
        .required('La contraseña es requerida')
        .min(8, 'La contraseña debe tener al menos 8 caracteres')
        .matches(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*\W)/,
            'La contraseña debe contener al menos una letra minúscula, una letra mayúscula, un número y un carácter especial.'
        ),
});