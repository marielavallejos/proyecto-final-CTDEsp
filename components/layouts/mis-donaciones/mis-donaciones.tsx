import React from 'react';
import { useState, useEffect } from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import LandingTitles from '../ui/landing-titles';
import { Donaciones } from 'interfaces/donaciones.type';
import { ProyectoFinal } from 'interfaces/proyect.type';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import Divider from '@mui/material/Divider';

interface Props {
  listaDonaciones: Donaciones[];
  listaProyectos: ProyectoFinal[];
}

const MisDonaciones: React.FC<Props> = ({ listaDonaciones, listaProyectos }) => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const [donacionesUsuario, setDonacionesUsuario] = useState<Donaciones[]>([]);
  const coloredTextStyle = {
    color: '#0B3954',
  };

  const getNombreProyecto = (idProyecto: number) => {
    const proyecto = listaProyectos.find((p) => p.id === idProyecto);
    return proyecto ? proyecto.nombre : 'Proyecto no encontrado';
  };

  const getRecaudadoHastaFecha = (idProyecto: number) => {
    const proyecto = listaProyectos.find((p) => p.id === idProyecto);
    return proyecto ? proyecto.montoSumatoriaDonaciones : 0;
  };

  useEffect(() => {
    setDonacionesUsuario(listaDonaciones);
  }, [listaDonaciones]);
  return (
    <div style={{ margin:'80px' }}>
      <LandingTitles smallTitle='Un resumen de tu ayuda' title='Mis donaciones' color="black"/>


{isSmallScreen ? (
  <>
      <Grid container spacing={2}>
        {donacionesUsuario.map((donacion) => (
          <React.Fragment key={donacion.id}>
            <Grid item xs={12} sm={2}>
              <Typography variant="subtitle1" align="left" noWrap style={{ ...coloredTextStyle, marginBottom: '15px' }}>
               Fecha: {donacion.fechaDonacion}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle1" align="left" noWrap style={{ ...coloredTextStyle, marginBottom: '15px' }}>
                {getNombreProyecto(donacion.idProductos)}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={2}>
              <Typography variant="subtitle1" align="left" noWrap style={{ ...coloredTextStyle, marginBottom: '15px' }}>
                Recaudado: ${getRecaudadoHastaFecha(donacion.idProductos)}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={2}>
              <Typography variant="subtitle1" align="left" noWrap style={{ ...coloredTextStyle, marginBottom: '15px' }}>
                Mi donación: ${donacion.cantidad}
              </Typography>
              <Divider />
            </Grid>

          </React.Fragment>
          
        ))}
      </Grid>
      </>
      ) : (
        <>
        <Grid container spacing={2} style={{ marginBottom: '10px' }}>
          <Grid item xs={12} sm={2}>
            <Typography variant="subtitle1" align="left" noWrap style={coloredTextStyle}>
              <strong>Fecha</strong>
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="subtitle1" align="left" noWrap style={coloredTextStyle}>
              <strong>Proyecto</strong>
            </Typography>
          </Grid>
          <Grid item xs={12} sm={2}>
            <Typography variant="subtitle1" align="left" noWrap style={coloredTextStyle}>
              <strong>Recaudado hasta la fecha</strong>
            </Typography>
          </Grid>
          <Grid item xs={12} sm={2}>
            <Typography variant="subtitle1" align="left" noWrap style={coloredTextStyle}>
              <strong>Mi contribución</strong>
            </Typography>
          </Grid>
        </Grid>
  
        <Grid container spacing={2}>
          {donacionesUsuario.map((donacion) => (
            <React.Fragment key={donacion.id}>
              <Grid item xs={12} sm={2}>
                <Typography variant="subtitle1" align="left" noWrap style={{ ...coloredTextStyle, marginBottom: '15px' }}>
                  {donacion.fechaDonacion}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="subtitle1" align="left" noWrap style={{ ...coloredTextStyle, marginBottom: '15px' }}>
                  {getNombreProyecto(donacion.idProductos)}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={2}>
                <Typography variant="subtitle1" align="left" noWrap style={{ ...coloredTextStyle, marginBottom: '15px' }}>
                  ${getRecaudadoHastaFecha(donacion.idProductos)}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={2}>
                <Typography variant="subtitle1" align="left" noWrap style={{ ...coloredTextStyle, marginBottom: '15px' }}>
                  ${donacion.cantidad}
                </Typography>
                
              </Grid>

            </React.Fragment>
            
          ))}
        </Grid>
        </>
      )}
              <Grid marginTop={4}>
              <Typography variant="h6" align="center">Ten en cuenta que las donaciones puden tardar en reflejasre, por favor refresca la página</Typography>
              </Grid>
    </div>
  );
};

export default MisDonaciones;


