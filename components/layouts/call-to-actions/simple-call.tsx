import { Button, Grid, Typography } from '@mui/material'
import React from 'react'

const SimpleCall = () => {
  return (
    <Grid padding={12} sx={{display: "flex", backgroundColor: "#09ac8bcf"}} justifyContent={"space-around"} alignItems={"center"}>
        <Typography variant='h4' fontWeight={"bolder"}>
            Apoya nuestro proyecto y haz una diferencia hoy
        </Typography>
        <Button href="/proyectos-generales" variant='contained' sx={{fontWeight: "lighter", backgroundColor: "black", borderRadius:"0px", padding:"20px"  }}>Haz tu aporte</Button>
    </Grid  >
  )
}

export default SimpleCall