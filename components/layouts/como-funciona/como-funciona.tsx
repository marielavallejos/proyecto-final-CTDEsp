import { Grid, Typography } from '@mui/material'
import Image from 'next/image'
import React from 'react'
import LandingTitles from '../ui/landing-titles'
import RedoIcon from '@mui/icons-material/Redo';
const ComoFunciona = () => {
    return (
        <>
            <Grid sx={{ backgroundColor: "#0B3954", color: "white", padding: "15px", marginTop: "30px" }}>

                <LandingTitles smallTitle={"Explorando el Proceso "} title='¿Cómo funciona wowfunding?' color='white' />
            </Grid>

            <Grid container justifyContent={"space-around"} marginTop={5} >
                <Grid item lg={2}>
                    <Image src="/Paso1.png"
                        width={250}
                        height={250}
                        alt={`Imagen`} />
                    <Typography variant='body1' align='center'>
                        Subís la información de tu idea a wowfunding.Te vamos a guiar paso a paso
                    </Typography>
                </Grid>
                <Grid item lg={1} display={"flex"} alignItems={"center"}>
                    <RedoIcon sx={{ fontSize: "95px", color: '#9c27b0' }} />
                </Grid>
                <Grid item lg={2}>
                    <Image src="/Paso2.png"
                        width={250}
                        height={250}
                        alt={`Imagen`} />
                    <Typography variant='body1' align='center'>
                        Publicás tu proyecto para que todo el mundo lo vea
                    </Typography>
                </Grid>
                <Grid item lg={1} display={"flex"} alignItems={"center"}>
                    <RedoIcon sx={{ fontSize: "95px", color: '#9c27b0' }} />
                </Grid>
                <Grid item lg={2}>
                    <Image src="/Paso3.png"
                        width={250}
                        height={250}
                        alt={`Imagen`} />
                    <Typography variant='body1' align='center'>
                        Compartimos en las redes para que  llegue a las personasque te ayudarán
                    </Typography>
                </Grid>
                <Grid item lg={1} display={"flex"} alignItems={"center"}>
                    <RedoIcon sx={{ fontSize: "95px", color: '#9c27b0' }} />
                </Grid>
                <Grid item lg={2}>
                    <Image src="/Paso4.png"
                        width={250}
                        height={250}
                        alt={`Imagen`} />
                    <Typography variant='body1' align='center'>
                        Llegás al objetivo y WOW!Celebramos el éxito
                    </Typography>
                </Grid>
            </Grid>
        </>
    )
}

export default ComoFunciona