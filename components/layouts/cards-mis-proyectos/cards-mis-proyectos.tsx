import React from 'react';
import { Grid } from '@mui/material';
import MiProyectoCard from '../ui/mi-proyecto-card';
import LandingTitles from '../ui/landing-titles';
import { ProyectoFinal } from 'interfaces/proyect.type';

interface Props {
  listaProyectosUsuario: ProyectoFinal[];
}

const CardsMisProyectos: React.FC<Props> = ({ listaProyectosUsuario }) => {
  return (
    <>
      <Grid sx={{ backgroundColor: "#FF595E", paddingBottom: '30px' }} container direction="column" alignItems="center" spacing={4} style={{ marginBottom: '50px' }}>
        <Grid item>
          <LandingTitles smallTitle='Campañas iniciadas' title='Mis proyectos' color="black" />
        </Grid>
        <Grid item container justifyContent="center" spacing={2}>
          {listaProyectosUsuario.map((proyecto, index) => (
            <Grid item key={index}>
              <MiProyectoCard proyecto={proyecto} widthParam={false} />
            </Grid>
          ))}
        </Grid>
      </Grid>
    </>
  );
};

export default CardsMisProyectos;