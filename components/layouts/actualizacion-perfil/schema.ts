import * as yup from "yup";


export const schema = yup.object({
    email: yup.string().email(),
    name: yup.string(),
    lastname: yup.string(),
    profileUrl: yup.string(),
    password: yup.string().required("este campo es obligatorio para confirmar cambios")



});