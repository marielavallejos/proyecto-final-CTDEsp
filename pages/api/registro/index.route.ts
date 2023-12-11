import type { NextApiRequest, NextApiResponse } from 'next';
import {
    ERROR_SERVER,
    ERROR_INCORRECT_DATA,
    ERROR_METHOD_NOT_ALLOWED
} from "services/sesion/user-sesion.errors";
import { postRegistro, postRegistroApi } from 'services/sesion/user-sesion.service';

type Data = {
    data: any;
} | {
    error: string;
    message: string;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {

    if (req.method !== "POST") {
        res.status(405).json(ERROR_METHOD_NOT_ALLOWED);
        return;
    }

    try {
        const result = await postRegistroApi(req.body);
        const resultJSON = JSON.stringify(result);
        res.setHeader('Set-Cookie', `access-confirmacion=${resultJSON}; Path=; HttpOnly; SameSite=Lax`);
        res.status(200).json({ data: result });
    } catch (err) {
        res.status(500).json({ error: "en el error 500  ", message: "error 500" });
    }

}