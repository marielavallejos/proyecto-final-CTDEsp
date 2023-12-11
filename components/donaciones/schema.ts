import * as yup from "yup";


export const schema = yup.object({
    cantidad: yup.string().required('El monto a donar es requerido'),
    comentario: yup.string()
    
});