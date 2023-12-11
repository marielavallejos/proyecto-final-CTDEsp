import { Avatar, Button, Card, Container, Grid, Link, Stack, Typography } from '@mui/material';
import BloqueProyectoImg from 'components/layouts/ui/bloque-imagen-proyecto';
import { Spinner } from 'components/layouts/ui/spinner';
import BasicTabs, { CustomTabPanel } from 'components/layouts/ui/tabs';
import { ProyectoFinal, Proyectos } from 'interfaces/proyect.type'
import { GetStaticPaths, GetStaticProps } from 'next';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React from 'react'
import { getProyecto, getProyectoById, getProyectos } from 'services/proyectos/proyectos.service';
import GeneralHeader from 'components/layouts/header/general-header.component';
import CommentBlock from 'components/layouts/coment-section/coment-block';
import { buscarDescipcionPorTipo, buscarMultimediaPorTipo, calcularDiasFaltantes, esFechaExpirada } from 'utils/utils';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import ProyectosSugeridos from 'components/layouts/proyectos-sugeridos/proyectos-sugeridos';
import PreguntasFrecuentes from 'components/preguntas-frecuentes/preguntas-frecuentes';

interface Props {
    proyecto: ProyectoFinal;
    proyectos: Proyectos;
}

const ProyectoID = ({ proyecto, proyectos }: Props) => {

    const LISTA_MULTIMEDIAS = proyecto.multimedias
    const LISTA_DESCRIPCIONES = proyecto.descripciones

    const router = useRouter();

    if (router.isFallback === true) {
        return <Spinner />;
    }

    const handleDonate = async (id: number | undefined) => {
        const codigoId = id? id : 122
        const response: ProyectoFinal = await getProyectoById(codigoId);


        if (response) {
            await new Promise(resolve => setTimeout(resolve, 2000));

            router.push({
                pathname: "/donaciones",
                query: { id: response.id },
            });
        } else {
            router.push(`/`);
        }
    };

    return (
        <>
            <GeneralHeader />
            <Container maxWidth="xl"  >
                <Stack direction={"column"} display={'flex'} justifyContent={'center'} spacing={5} marginTop={4}>
                    <Typography marginTop={5} variant='h3' fontWeight={"bold"} textAlign={"center"}>{proyecto.nombre}</Typography>

                    <Grid container>
                        <Grid item xs={8}>
                            <Image src={buscarMultimediaPorTipo(LISTA_MULTIMEDIAS, 1)}
                                width={950}
                                height={630}
                                alt={proyecto.nombre}
                            />

                        </Grid>
                        <Grid item xs={4}>
                            <Grid sx={{ display: "flex", flexDirection: "column", marginTop: 3 }} >
                                <Grid >
                                    <Button variant='contained' sx={{ color: "white", marginBottom: "25px" }} color='secondary'>{proyecto.categoriasId.nombre}</Button>
                                    <Typography variant={'h5'} fontWeight={"bold"} >Resumen del proyecto</Typography>
                                    <Typography variant={'body1'} marginTop={2}>{buscarDescipcionPorTipo(proyecto.descripciones, 1)}</Typography>
                                    <Grid sx={{ display: "flex" }} gap={2} marginBottom={5} marginTop={4}>

                                        <Avatar src={buscarMultimediaPorTipo(LISTA_MULTIMEDIAS, 1)} alt={proyecto.nombre} />
                                        <Grid>
                                            <Link>Contactarse con el creador </Link>

                                        </Grid>
                                    </Grid>

                                    <Grid sx={{ display: "flex", justifyContent: "space-between" }} marginTop={3}>
                                        <Grid sx={{ display: "flex" }}>
                                            <Typography variant='h6' marginRight={1} fontWeight={"bold"}>$ {proyecto.montoSumatoriaDonaciones ? Math.round(proyecto.montoSumatoriaDonaciones): 0} recaudados de ${proyecto.monto}</Typography>
                                        </Grid>
                                        

                                    </Grid>
                                    <Typography variant="body2" color="text.secondary" marginTop={4} sx={{ display: "flex", alignItems: "center", justifyContent: "initial" }}>
                                        <AccessTimeIcon />
                                        {calcularDiasFaltantes(proyecto.fechaFinalizacion) > 0 ?
                                            `Quedan ${calcularDiasFaltantes(proyecto.fechaFinalizacion)} dias`
                                            :
                                            "Campaña finalizada"
                                        }
                                    </Typography>
                                </Grid>
                                <Grid sx={{ display: "flex", justifyContent: "center" }} marginTop={5} marginBottom={5}>
                                    {esFechaExpirada(proyecto.fechaFinalizacion) ?
                                        // <NextLink href="/donaciones" passHref >
                                            <Button variant="contained" sx={{ backgroundColor: "#4BC6B9", padding: "18px", color: "black" }} onClick={() =>handleDonate(proyecto.id)}>
                                                Donar a la campaña
                                            </Button>
                                        // </NextLink>
                                        :

                                        <Typography variant='h6' marginRight={1} fontWeight={"bold"}>Lo sentimos esta campaña ya finalizo</Typography>
                                    }
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>

                    <Grid container>
                        <Grid item xs={8}>
                            <BasicTabs>
                                <CustomTabPanel label="Descripcion" index={0} value={0}>
                                    <BloqueProyectoImg segmento={1} imagen={buscarMultimediaPorTipo(LISTA_MULTIMEDIAS, 2)} tituloImagen={"Quienes Somos"} descipcion={buscarDescipcionPorTipo(LISTA_DESCRIPCIONES, 1)} />
                                    <BloqueProyectoImg segmento={2} imagen={buscarMultimediaPorTipo(LISTA_MULTIMEDIAS, 3)} tituloImagen={"Descripción General"} descipcion={buscarDescipcionPorTipo(LISTA_DESCRIPCIONES, 2)} />
                                    <BloqueProyectoImg segmento={3} imagen={buscarMultimediaPorTipo(LISTA_MULTIMEDIAS, 4)} tituloImagen={"Conclusión"} descipcion={buscarDescipcionPorTipo(LISTA_DESCRIPCIONES, 3)} />
                                </CustomTabPanel>
                                <CustomTabPanel label="Preguntas frecuentes" index={1} value={0}>
                                    <PreguntasFrecuentes/>
                                </CustomTabPanel>
                                <CustomTabPanel label="Comentarios" index={2} value={0}>
                                    <CommentBlock />
                                </CustomTabPanel>
                            </BasicTabs>
                        </Grid>
                        <Grid item xs={4}>
                            <ProyectosSugeridos listaProyectos={proyectos} />
                        </Grid>
                    </Grid>
                </Stack>
            </Container>
        </>
    )
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
    const id = parseInt(params?.id as string);
    const data = await getProyecto(id);
    const proyectos = await getProyectos(0, 10);
    return {
        props: {
            proyecto: data,
            proyectos,
        },
        revalidate: 10,
    };
};

export const getStaticPaths: GetStaticPaths = async () => {
    const dataprojecto: Proyectos = await getProyectos(0, 100);

    const paths = dataprojecto?.map((proyecto) => {
        const codigoId = proyecto.id? proyecto.id : 122
        return { params: { id: codigoId.toString() } };
    });
    return {
        paths,
        fallback: false,
    };
};

export default ProyectoID