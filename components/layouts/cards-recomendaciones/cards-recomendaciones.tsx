import React, { useState } from 'react'
import LandingTitles from '../ui/landing-titles'
import { Button, Grid } from '@mui/material'
import MediaCard from '../ui/media-card'
import { ProyectoFinal } from 'interfaces/proyect.type';
import { useRouter } from 'next/router';


interface Props {
    listaProyectos: ProyectoFinal[]
}

const CardsRecomendaciones = ({listaProyectos}: Props) => {
  const router = useRouter();
  const proyectosLimitados = listaProyectos.slice(0, 4);
      
    const handleVerMasClick = () => {
      router.push("/proyectos-generales")
    };
    return (
      <>
        <LandingTitles smallTitle='Explora nuestros proyectos' title={"Proyectos recientes"} color={"black"} />
        <Grid container spacing={4} justifyContent="space-around" style={{ margin: '0 1px' }} >
          {proyectosLimitados.map((card, index) => (
            <Grid item key={index} xs={12} sm={6} md={4} lg={3}>
              <MediaCard proyecto={card} widthParam={false} />
            </Grid>
          ))}
        </Grid>
  
        <Grid container justifyContent="center" marginTop={3} marginBottom={4}>
          <Button variant={'contained'} onClick={handleVerMasClick}>
            Ver más
          </Button>
        </Grid>
      </>
    );
  }

export default CardsRecomendaciones