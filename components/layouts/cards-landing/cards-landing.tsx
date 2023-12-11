import React, { useState } from 'react'
import LandingTitles from '../ui/landing-titles'
import { Button, Grid } from '@mui/material'
import MediaCard from '../ui/media-card'
import { ProyectoFinal } from 'interfaces/proyect.type';
import { useRouter } from 'next/router';


interface Props {
    listaProyectos: ProyectoFinal[]
}

const CardsLanding = ({listaProyectos}: Props) => {
  const router = useRouter();
  const proyectosLimitados = listaProyectos.slice(0, 4);
      
    const handleVerMasClick = () => {
      router.push("/proyectos-generales")
    };
    return (
        <>
          <LandingTitles smallTitle='Explora nuestros proyectos' title={"Proyectos destacados"} color={"black"} />
          <Grid container gap={4}>
            {proyectosLimitados.map((card, index) => (
              <MediaCard key={index} proyecto={card} widthParam={false} />
            ))}
          </Grid>
         
            <Grid sx={{ display: 'flex' }} marginTop={3} justifyContent={'center'}>
              <Button variant={'contained'} onClick={handleVerMasClick}>
                Ver más
              </Button>
            </Grid>
        </>
      );
      
    // return (
    //     <>
    //         <LandingTitles smallTitle='Explora nuestros proyectos' title={"Proyectos recientes"} color={"black"} />
    //         <Grid container gap={4}>
    //             {listaProyectos.map((card, index) =>
    //                 <MediaCard
    //                     key={index}
    //                     proyecto={card}
    //                     widthParam={false}
    //                 />
    //             )}

    //         </Grid>
    //         <Grid sx={{display:"flex"}} marginTop={3} justifyContent={"center"}>
    //             <Button variant={"contained"}>Ver más</Button>
    //         </Grid>
    //     </>
    // )

}

export default CardsLanding