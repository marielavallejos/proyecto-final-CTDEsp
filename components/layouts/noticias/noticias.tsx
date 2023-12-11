import { Grid } from '@mui/material'
import React from 'react'
import LandingTitles from '../ui/landing-titles'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

const news = [
    {
        image: "https://s3-pi2-gp2-wowfunding.s3.amazonaws.com/Noticias/Noticias2.jpg",
        titulo: "Wowfunding: La plataforma revolucionaria ",
        descripcion: "Descubre cómo Wowfunding está cambiando la forma en que apoyamos proyectos y causas importantes. Únete a nuestra comunidad y sé parte del cambio.",
        fecha: "10 de Noviembre de 2023"
    },
    {
        image: "https://s3-pi2-gp2-wowfunding.s3.amazonaws.com/Noticias/2Noticias.jpg",
        titulo: "¡Nuevos Proyectos Destacados!",
        descripcion: "Explora los proyectos más emocionantes que se sumaron a nuestra plataforma. Desde tecnología hasta arte y medio ambiente, tenemos algo para todos.",
        fecha: "5 de Diciembre de 2023"
    },
    {
        image: "https://s3-pi2-gp2-wowfunding.s3.amazonaws.com/MarLimpio/Img3MarLimpio.jpg",
        titulo: "Historias de Éxito: Proyectos que Hicieron Historia",
        descripcion: "Conoce a los creadores detrás de los proyectos que lograron superar sus objetivos. Sus historias inspiradoras te motivarán a apoyar tu próximo proyecto favorito.",
        fecha: "15 de Enero de 2024"
    },
    {
        image: "https://s3-pi2-gp2-wowfunding.s3.amazonaws.com/Noticias/Noticias4.jpg",
        titulo: "Celebramos un Nuevo Hitórico de Donaciones",
        descripcion: "Estamos emocionados de anunciar que hemos alcanzado un nuevo récord de donaciones. Gracias a tu generosidad, estamos logrando un impacto real en la sociedad.",
        fecha: "3 de Febrero de 2024"
    }
];

const Noticias = () => {
    return (
        <Grid>
            <LandingTitles smallTitle='Conoce las ultimas noticias' title='WowFunding en las noticias' color='black' />
            <Grid sx={{display: "flex"}} gap={4}>
                {news.map((noticia, index) => (
                    <Grid key={index} item xs={3}>
                        <Card sx={{ maxWidth: 345 }}>
                            <CardMedia
                                sx={{ height: 140 }}
                                image={noticia.image}
                                title="foto de noticias"
                            />
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="div">
                                    {noticia.titulo}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    {noticia.descripcion}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    {noticia.fecha}
                                </Typography>
                            </CardContent>
                            <CardActions>
                                <Button size="small">Ver mas</Button>
                            </CardActions>
                        </Card>

                    </Grid>
                ))}
            </Grid>
        </Grid>
    )
}

export default Noticias