import { ProyectoFinal } from "interfaces/proyect.type";
import { NextApiRequest, NextApiResponse } from "next";
import { getProyecto, postProyecto } from "services/proyectos/proyectos.service";
import { ERROR_SERVER } from "services/sesion/user-sesion.errors";
import { parse } from 'cookie';

type Data = {
    data: any;
} | { error: string, message: string }
type Cookies = {
    [key: string]: string;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
    const cookies: Cookies = parse(req.headers.cookie || '');

    const { id } = req.query;
    res.setHeader("Content-Type", "application/json");
    const idNumber = parseInt(`${id}`);


    if (req.method == "POST") {
        try {

            const cookieInfo = cookies['access-confirmacion']
            const cookieObj = JSON.parse(cookieInfo as any);
            const token = cookieObj.token;
            const result = await postProyecto(req.body, token);
            res.status(200).json({ data: result });

        } catch (err) {
            res.status(500).json({ error: "en el error 500  ", message: "error 500" });
        }
        return
    }
    try {
        const result: any | null = await getProyecto(idNumber);
        if (result === null) {
            res.status(404).json({ error: "No se encontró el proyecto", message: "El proyecto no existe" });
        } else {
            res.status(200).json(result);
        }
        return;
    } catch (err) {
        res.status(500).json(ERROR_SERVER)
    }



}



