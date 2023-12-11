export type Donaciones =
    {
        id:number,
        comentario: string,
        cantidad: number,
        fechaDonacion: string,
        metodoPagoID: MetodoPago,
        idUsuarios: number,
        idProductos: number
    }


    export type MetodoPago = {
        id: number;
    }