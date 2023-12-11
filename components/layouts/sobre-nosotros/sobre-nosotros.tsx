import { Grid, Typography } from '@mui/material'
import Image from 'next/image'
import React from 'react'
import LandingTitles from '../ui/landing-titles'

const SobreNosotros = () => {
    return (
        <Grid container sx={{ justifyContent: 'center' }} marginTop={5} marginBottom={5}>
            <Grid sx={{ ustifyContent: 'center' }}>
                <LandingTitles smallTitle='Conoce la fundacion' title='Sobre nosotros' color='black'/>
               
                <Typography variant='h6' textAlign={"center"}>
                    Nosotros somos Give Action y con WowFunding queremos comprometernos con la idea de un mundo mejor y más inclusivo.  Nuestra plataforma de crowdfunding para causas sociales es el resultado de la pasión y dedicación de un equipo diverso de individuos con un profundo amor por la humanidad, los animales, el deporte, la educación y la protección del medio ambiente.
                    Cada miembro de nuestro equipo comparte una pasión común por el impacto social positivo y está decidido a hacer del mundo un lugar mejor a través de la tecnología y la generosidad de las personas.
                </Typography>
                <Typography variant='h6' textAlign={"center"}>
                    En colaboración con nuestras valiosas alianzas, así como con influencers, streamers y creadores de contenido, estamos trabajando incansablemente para empoderar a personas de todas las edades y orígenes a unirse a nuestra causa y contribuir a proyectos humanitarios y sociales que marcan la diferencia.
                </Typography>
                <Typography variant='h6' textAlign={"center"}>
                    Nuestra visión es crear un espacio donde la generosidad y la transparencia se encuentren, y donde cada pequeña contribución se convierta en un impacto duradero. Te invitamos a unirte a nosotros en este emocionante viaje hacia un mundo mejor.
                </Typography>
                <Typography variant='h6' fontWeight={"bold"} textAlign={"center"}>
                    ¡Juntos podemos marcar la diferencia!
                </Typography>
                <Grid sx={{ display: "flex", justifyContent: "center" }} marginBottom={4} marginTop={4}>
                    <Image
                        width={150}
                        height={100}
                        alt=''
                        src="/logo.png"
                    />
                </Grid>
            </Grid>
        </Grid>

    )
}

export default SobreNosotros