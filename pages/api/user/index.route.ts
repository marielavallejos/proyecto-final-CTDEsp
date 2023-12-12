import type { NextApiRequest, NextApiResponse } from 'next';
import { postActualizacion } from 'services/sesion/user-sesion.service';
import { parse, serialize } from 'cookie';
import { cookies } from 'next/headers'
type Data = {
  data: any;
} | {
  error: string;
  message: string;
}
type Cookies = {
  [key: string]: string;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  const cookies: Cookies = parse(req.headers.cookie || '');

  if (req.method !== "PUT") {

    res.status(500).json({ error: "error 500  ", message: "method not patch" });
    return;
  }

  try {

    const cookieInfo = cookies['access-confirmacion']
    const cookieObj = JSON.parse(cookieInfo as any);
    const usuarioId = cookieObj.id;
    const token = cookieObj.token;
    const result = await postActualizacion(req.body, token, usuarioId);
    const nuevaCookie = {
      ...req.body,
      token,
      id: usuarioId,
    };

      // Configurar la nueva cookie
    res.status(200).json({ data: result });

  } catch (err) {

    res.status(500).json({ error: "en el error 500  ", message: "error 500" });
  }

}