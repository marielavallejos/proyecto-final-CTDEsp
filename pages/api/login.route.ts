import { ILogin, IUser } from 'interfaces/user.type';
import type { NextApiRequest, NextApiResponse } from 'next';
import {
    ERROR_SERVER,
    ERROR_INCORRECT_DATA,
    ERROR_METHOD_NOT_ALLOWED
} from "services/sesion/user-sesion.errors";
import { postLoginAPI } from 'services/sesion/user-sesion.service';

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
        const body: ILogin = req.body;
        const result = await postLoginAPI(body);
        const resultJSON = JSON.stringify(result);
        console.log('resultJSON', resultJSON)
        res.setHeader('set-cookie', `access-confirmacion=${resultJSON}; path=/; semesite=lax;`)
        res.status(200).json({ data: result });
        return
    } catch (err) {
        const body: ILogin = req.body;
        res.status(500).json(ERROR_SERVER);
    }

}