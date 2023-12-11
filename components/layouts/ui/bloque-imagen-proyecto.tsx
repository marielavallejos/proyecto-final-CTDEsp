import { Grid, Typography } from '@mui/material'
import Image from 'next/image'
import React from 'react'


interface Props {
    segmento:number,
    imagen: string;
    tituloImagen: string;
    descipcion: string;
}

const ARRAY_SEGMENTOS = [
    "","Quienes somos", "Descipcion del proyecto", "Cierre"
]
const BloqueProyectoImg = ({segmento, imagen, descipcion, tituloImagen }: Props) => {
    return (
        <Grid container sx={{ display: "flex", flexDirection: "column" }} marginTop={5}>
            <Grid item sx={{ display: "flex", flexDirection: "column" }} xs={10}>
                <Image src={imagen}
                    width={950}
                    height={500}
                    alt={tituloImagen}
                />
                <Typography variant='h5' fontWeight={"bold"} marginTop={3}>
                    {ARRAY_SEGMENTOS[segmento]}
                </Typography>
                <Typography variant='body1' marginTop={3} marginBottom={3}>
                    {descipcion}
                </Typography>
            </Grid>
        </Grid>
    )
}

export default BloqueProyectoImg