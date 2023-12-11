import { ProyectoFinal } from "interfaces/proyect.type";
import { NextApiRequest, NextApiResponse } from "next";
import { deleteProyecto, getProyecto, getProyectos, postProyecto } from "services/proyectos/proyectos.service";
import { ERROR_SERVER } from "services/sesion/user-sesion.errors";
import { parse } from 'cookie';
type Data = {
  data: any;
} | { error: string, message: string }

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  const { offset, limit,  categoria } = req.query;
  const offsetNumber = offset ? parseInt(offset as string, 10) : undefined;
  const limitNumber = limit ? parseInt(limit as string, 10) : undefined;
  const categoriaString = Array.isArray(categoria) ? categoria.join(', ') : categoria;

  try {
    const result = await getProyectos(0, limitNumber, categoriaString);

    res.status(200).json({ data: result });

  } catch (err) {
    res.status(500).json({ error: "en el error 500  ", message: "error 500" });
  }


}