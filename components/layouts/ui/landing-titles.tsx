import { Grid, Typography } from '@mui/material'
import React from 'react'
import AppsIcon from '@mui/icons-material/Apps';
interface Props {
    smallTitle: string;
    title: string;
    color: string
}
const LandingTitles = ({ smallTitle, title, color }: Props) => {
    return (
        <Grid margin={5} textAlign={"center"} sx={{display: "flex", flexDirection:"column"}} alignItems={"center"}>
            <Grid sx={{display:"flex"}}>
                <AppsIcon color='primary'/>
                <Typography variant='body1' sx={{ color }} fontWeight={"800"}>{smallTitle}</Typography>
            </Grid>
            <Typography variant='h3' sx={{ color }} fontWeight={"800"}>{title}</Typography>
        </Grid>
    )
}

export default LandingTitles