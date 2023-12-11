import React from 'react'
import LandingTitles from '../ui/landing-titles'
import { Button, Grid, Typography } from '@mui/material'
import MediaCard from '../ui/media-card'
import { ProyectoFinal } from 'interfaces/proyect.type'



interface Props {
    listaProyectos: ProyectoFinal[]
}

const ProyectosSugeridos = ({listaProyectos}:Props) => {
    const proyectosLimitados = listaProyectos.slice(0, 3);
    return (
        <Grid container sx={{ display: "flex" }}>
            <Typography variant='h5' fontWeight={"bold"} marginBottom={6} marginLeft={1}> Proyectos destacados</Typography>
            <Grid container gap={6}>
                {proyectosLimitados.map((card, index) =>
                    <MediaCard
                        key={index}
                        proyecto={card}
                        widthParam
                    />
                )}
            </Grid>
        </Grid>
    )
}

export default ProyectosSugeridos