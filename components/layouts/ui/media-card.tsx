import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import LinearDeterminate from './linear-determinate';
import NextLink from 'next/link'
import { Grid, Link as MUILink } from '@mui/material';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { buscarDescipcionPorTipo, buscarMultimediaPorTipo, calcularDiasFaltantes, truncateString } from 'utils/utils';
import { ListaDescripciones, ListaMultimedias, ProyectoFinal } from 'interfaces/proyect.type';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getProyecto, getProyectoById } from 'services/proyectos/proyectos.service';

interface Props {
    proyecto: ProyectoFinal,
    widthParam: boolean
}

const MediaCard = ({ proyecto, widthParam }: Props) => {

const router = useRouter();

const LISTA_MULTIMEDIAS = proyecto.multimedias
const LISTA_DESCRIPCIONES = proyecto.descripciones
const TIPO_LANDING = 1;

const porcentajeCalculado = proyecto.montoSumatoriaDonaciones? Math.round((proyecto.montoSumatoriaDonaciones/ proyecto.monto) * 100): 0

    return (
        <Card sx={{ maxWidth: widthParam ? 500 : 345, boxShadow: "3px 1px 18px 2px rgba(0,0,0,0.05)" }}>
            <CardMedia
                sx={{ position: 'relative', height: 250, minWidth: 500}}
                image={buscarMultimediaPorTipo(LISTA_MULTIMEDIAS, TIPO_LANDING)}
                title="Foto proyecto">
                <div style={{
                    position: 'absolute',
                    top: 10,
                    right: 10,
                    zIndex: 1,
                    background: 'white',
                    width: '40px',
                    height: '40px',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}>
                    <FavoriteIcon sx={{ color: '#a3a3a3', fontSize: 25 }} />
                </div>
            </CardMedia>
            <CardContent sx={{ display: "flex", alignItems: "center", paddingBottom: "0px" }}>
                <Button variant='contained' sx={{ color: "white", marginRight: "5px" }} color='secondary'>{proyecto.categoriasId.nombre}</Button>
                <Typography variant="body2" color="text.secondary" sx={{ display: "flex", alignItems: "center" }}>
                    <AccessTimeIcon />
                    {calcularDiasFaltantes(proyecto.fechaFinalizacion) > 0 ?
                        `Quedan ${calcularDiasFaltantes(proyecto.fechaFinalizacion)} dias`
                        :
                        "Campaña finalizada"
                    }
                </Typography>
            </CardContent>
            <CardContent>
                <NextLink href={`/proyecto-donar/${proyecto.id}`} passHref>
                    <MUILink variant="h6" sx={{ fontWeight: 800, textAlign: "initial" }}>{proyecto.nombre}</MUILink>
                </NextLink>

                <Typography variant="body2" color="text.secondary" marginTop={1}>
                    {truncateString(buscarDescipcionPorTipo(LISTA_DESCRIPCIONES, TIPO_LANDING))}
                </Typography>
            </CardContent>
            <CardContent>
                <Grid sx={{ display: 'flex', justifyContent: "space-between" }}>
                    <Typography gutterBottom variant="body1" fontWeight={"bold"} sx={{ color: "#abb8c3" }}>
                        Recaudados $ { proyecto.montoSumatoriaDonaciones ? Math.round(proyecto.montoSumatoriaDonaciones) : 0}
                    </Typography>
                    <Typography gutterBottom variant="body1" fontWeight={"bold"} sx={{ color: "#abb8c3" }}>
                        % {porcentajeCalculado > 100 ? 100 : porcentajeCalculado}
                    </Typography>
                </Grid>
                <LinearDeterminate amount={proyecto.montoSumatoriaDonaciones} finalAmount={proyecto.monto} />
                <Typography variant="body1" marginTop={1} fontWeight={"bold"} color="primary">
                    Objetivo:  $ {proyecto.monto}
                </Typography>
            </CardContent>
        </Card>
    );
}

export default MediaCard

