import * as yup from "yup";


export const schema = yup.object({

    email: yup.string().email(),

    name: yup.string(),

    lastname: yup.string(),


});