import { Donaciones } from "interfaces/donaciones.type";
import { NextApiRequest, NextApiResponse } from "next";
import { postDonaciones } from "services/donaciones/donaciones.service";
import { ERROR_INCORRECT_DATA, ERROR_METHOD_NOT_ALLOWED, ERROR_SERVER } from "services/sesion/user-sesion.errors";

type Data = {
  data?: Donaciones;
  error?: string;
  message?: string;
};


const data = {
  columns: [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'firstName', headerName: 'First Name', width: 130 },
    { field: 'lastName', headerName: 'Last Name', width: 130 },
    { field: 'age', headerName: 'Age', type: 'number', width: 90 },
  ],
  rows: [
    { id: 1, firstName: 'John', lastName: 'Doe', age: 25 },
    { id: 2, firstName: 'Jane', lastName: 'Doe', age: 30 },
    { id: 3, firstName: 'Bob', lastName: 'Smith', age: 40 },
  ],
};



export default function handler(req: NextApiRequest, res: NextApiResponse) {

  if (req.method == 'GET') {
    return res.status(200).json(data);
  } else {
    return res.status(400).json({ message: 'Método no autorizado' });
  };
};