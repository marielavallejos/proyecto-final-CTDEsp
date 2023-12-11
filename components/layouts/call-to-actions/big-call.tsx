import { Button, Grid } from '@mui/material';
import React from 'react';
import Image from 'next/image';
import LandingTitles from '../ui/landing-titles';

interface Props {
    image: string;
    smallTitle: string;
    title: string;
    color: string;
    buttonText: string;

}

const BigCall = ({ image,
    smallTitle,
    title,
    color,
    buttonText }: Props) => {


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
        <Grid sx={containerStyle}>
            <Image src={image} style={{ objectFit: "cover" }} fill
                alt='' />
            <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, background: 'rgba(0, 0, 0, 0.7)', padding: '20px', zIndex: 1, height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                <LandingTitles
                    smallTitle={smallTitle}
                    title={title}
                    color={color} />
                <Button variant='contained'
                    sx={{ fontWeight: "lighter", backgroundColor: "black", borderRadius: "0px", padding: "20px" }}>
                    {buttonText}
                </Button>
            </div>
            <div style={{ position: "relative" }}></div>
        </Grid >
    );
}

export default BigCall;
