import * as React from 'react';
import Box from '@mui/material/Box';
import Image from "next/image";
import {Grid, Link, Typography} from "@mui/material";

const socialMediaIcons = [
    { name: 'Facebook', iconUrl: '/Facebook.png', link: 'https://www.facebook.com/' },
    { name: 'Instagram', iconUrl: '/Instagram.png', link: 'https://www.instagram.com/' },
    { name: 'Youtube', iconUrl: '/Youtube.png', link: 'https://www.youtube.com/' },
    { name: 'LinkedIn', iconUrl: '/Linkedin.png', link: 'https://www.linkedin.com/' },
];

const GeneralFooter = () => {
    return (
        <Box component={"footer"} display={'flex'}  p={'1rem 0'}
              alignItems='center'
              justifyContent={'center'}
              borderTop={'1px solid #eaeaea'}
              sx={{backgroundColor: "#4BC6B9"}}>
        
        <Grid container justifyContent="space-between" alignItems="center" maxWidth={"70%"}>
            <Grid item container justifyContent="center" alignItems="center">
                {socialMediaIcons.map((socialIcon) => (
                    <Link key={socialIcon.name} href={socialIcon.link} sx={{ marginRight: 5 }}>
                        <Image src={socialIcon.iconUrl} alt={socialIcon.name} width={30} height={30} />
                    </Link>
                ))}
            </Grid>
        </Grid>

            <Grid item xs={6}>
                <Typography>Powered by Give Accion</Typography>
            </Grid>
       </Box>
    );
};
export default GeneralFooter;
