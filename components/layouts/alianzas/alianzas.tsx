import { Grid, Typography } from '@mui/material'
import Image from 'next/image'
import React from 'react'
import LandingTitles from '../ui/landing-titles'

const Alianzas = () => {
    return (
        <Grid sx={{backgroundColor: "#4BC6B9"}} padding={4}>
            <LandingTitles smallTitle='Conoce quienes nos apoyan' title='Nuestras alianzas' color="white"/>
            <Grid container justifyContent={"space-around"} marginTop={3} alignItems={"center"} >
                <Grid item lg={2}>
                    <Image src="/digital-house.png"
                        width={220}
                        height={150}
                        alt={`Imagen`} />

                </Grid>
                <Grid item lg={2}>
                    <Image src="/globant.png"
                        width={220}
                        height={100}
                        alt={`Imagen`} />

                </Grid>
                <Grid item lg={2}>
                    <Image src="/meli.png"
                        width={320}
                        height={120}
                        alt={`Imagen`} />

                </Grid>
                <Grid item lg={2}>
                    <Image src="/accenture.png"
                        width={220}
                        height={150}
                        alt={`Imagen`} />

                </Grid>

            </Grid>
        </Grid>
    )
}

export default Alianzas