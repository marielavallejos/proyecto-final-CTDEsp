import { Grid, Typography } from '@mui/material'
import Image from 'next/image'
import React from 'react'
import LandingTitles from '../ui/landing-titles'
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import PaidIcon from '@mui/icons-material/Paid';
import SupervisedUserCircleIcon from '@mui/icons-material/SupervisedUserCircle';
import PublicIcon from '@mui/icons-material/Public';
interface Props {
    total?: number,
    proyectos?: number,
    personas?: number,
    causas?: number
}
const ReporteLanging = ({ total, proyectos, personas, causas }: Props) => {
    return (
        <>
            <Grid sx={{ backgroundColor: "#9c27b0", color: "white", marginTop: "30px" }} padding={8}>



                <Grid container justifyContent={"space-around"}>
                    <Grid item lg={2} sx={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
                        <CheckCircleIcon sx={{ fontSize: "95px" }} />
                        <Typography variant='h3' fontWeight={"bold"} align='center'>
                            120
                        </Typography>
                        <Typography variant='body1' fontWeight={"bold"} align='center'>
                            Proyectos completados
                        </Typography>
                    </Grid>
                    <Grid item lg={2} sx={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
                        <PaidIcon sx={{ fontSize: "95px" }} />
                        <Typography variant='h3' fontWeight={"bold"} align='center'>
                            1.000.000
                        </Typography>
                        <Typography variant='body1' fontWeight={"bold"} align='center'>
                            Recaudado hasta la fecha
                        </Typography>
                    </Grid>
                    <Grid item lg={2} sx={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
                        <SupervisedUserCircleIcon sx={{ fontSize: "95px" }} />
                        <Typography variant='h3' fontWeight={"bold"} align='center'>
                            20
                        </Typography>
                        <Typography variant='body1' fontWeight={"bold"} align='center'>
                            Personas asociadas
                        </Typography>
                    </Grid>
                    <Grid item lg={2} sx={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
                        <PublicIcon sx={{ fontSize: "95px" }} />
                        <Typography variant='h3' fontWeight={"bold"} align='center'>
                            250
                        </Typography>
                        <Typography variant='body1' fontWeight={"bold"} align='center'>
                            Causas generadas
                        </Typography>
                    </Grid>
                </Grid>
            </Grid>
        </>
    )
}

export default ReporteLanging