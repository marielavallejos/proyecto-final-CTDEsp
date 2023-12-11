import React from 'react';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import NextLink from 'next/link'
import Image from "next/image";
import Link from 'next/link'

const RegistroExitoso = () => {

  return (
    <Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
      marginTop={20}
    >
      <Grid item>
        <Container maxWidth="sm">
          <Grid
            container
            spacing={2}
            justifyContent="center"
            alignItems="center"
            bgcolor="#4bc6b9"
            padding={2}
          >
            <Grid item xs={12}>
              <Typography variant="h4" align="center">
                ¡Registro exitoso!
              </Typography>
              <NextLink href="/" passHref >
                <Typography variant="h6" align="center" gutterBottom>
                  Estas listo para empezar a cambiar el mundo.
                </Typography>
              </NextLink>
            </Grid>
            <Grid container justifyContent="center">
              <Grid item xs={12} style={{ textAlign: 'center' }}>
                <Image src="/logo.png" width={120} height={70} alt="Logo" />
              </Grid>
              <Grid item xs={12} style={{ display: 'flex', justifyContent: 'center', marginTop: '10px' }}>
                <Link href="/" replace>
                  Volver al inicio
                </Link>
              </Grid>
            </Grid>
          </Grid>
        </Container>
      </Grid>
    </Grid>
  );
};

export default RegistroExitoso;