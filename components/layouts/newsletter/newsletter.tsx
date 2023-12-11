import { Button, Grid, TextField, Typography } from '@mui/material'
import Image from 'next/image';
import React from 'react'
import LandingTitles from '../ui/landing-titles';

const Newsletter = () => {

    const containerStyle = {
        position: 'relative',
        height: '60vh',
        
    };

    const imageStyle = {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        clipPath: 'polygon(0 0, 100% 0, 100% 50%, 0 50%)',
    };
    return (
        <Grid sx={containerStyle} marginTop={4} marginBottom={4}>
            <Image src="/news.jpg" layout="fill" objectFit="cover" alt='' />
            <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, background: 'rgba(0, 0, 0, 0.7)', padding: '20px', zIndex: 1, height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                <LandingTitles smallTitle='Mantenete informado' title='Unite a la comunidad de wowfounders' color='white' />
                <Grid sx={{display: "flex"}} alignItems={"center"}>

                    <TextField placeholder='introduci tu email' sx={{ backgroundColor: "white", boxSizing: "border-box", minWidth: "450px", marginRight: "20px"}} />
                    <Button variant='contained'
                        sx={{ fontWeight: "lighter",  borderRadius: "0px", padding: "20px" }}>
                        Suscribite
                    </Button>
                </Grid>
            </div>
        </Grid >
    );
}


export default Newsletter



