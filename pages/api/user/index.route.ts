import type { NextApiRequest, NextApiResponse } from 'next';
import { postActualizacion } from 'services/sesion/user-sesion.service';
import { parse, serialize } from 'cookie';

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
    res.status(200).json({ data: result });
    const nuevaCookie = {
        ...req.body,
        token,
        id: usuarioId,
    }
    const resultJSON = JSON.stringify(nuevaCookie);
    // Serializa las cookies actualizadas para configurarlas en el encabezado
    const nuevasCookiesSerializadas = serialize('access-confirmacion', nuevaCookie, {
    path: '/',  // Ajusta según tu configuración
    sameSite: 'lax',  // Ajusta según tu configuración
  });
  res.setHeader('Set-Cookie', nuevasCookiesSerializadas);

  } catch (err) {

    res.status(500).json({ error: "en el error 500  ", message: "error 500" });
  }

}