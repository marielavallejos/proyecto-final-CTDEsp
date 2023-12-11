import React from 'react';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Carousel } from 'react-responsive-carousel';
import Image from 'next/image'
import NextLink from 'next/link'
import { Link as MUILink, Typography } from '@mui/material';

// const items: string[] = [
//     'https://s3-pi2-gp2-wowfunding.s3.amazonaws.com/CARRUSEL/1Carrusel.jpg',
//     'https://s3-pi2-gp2-wowfunding.s3.amazonaws.com/DDHHEnAccion/PortadaDDHHEnAccion.jpg',
//     'https://s3-pi2-gp2-wowfunding.s3.amazonaws.com/CARRUSEL/3Carrusel.jpg',
//     'https://s3-pi2-gp2-wowfunding.s3.amazonaws.com/ExploraCiencia/PortadaExploraCiencia.jpg',
//     'https://s3-pi2-gp2-wowfunding.s3.amazonaws.com/NuevosHorizontes/Img1NuevosHorizontes.jpg',
//     'https://s3-pi2-gp2-wowfunding.s3.amazonaws.com/ArteEnLaCalle/Img2ArteEnLaCalle.jpg',
// ];
const items: { imageUrl: string; text: string }[] = [
    { imageUrl: 'https://s3-pi2-gp2-wowfunding.s3.amazonaws.com/CARRUSEL/1Carrusel.jpg', text: 'Donar en WowFunding es más que ayudar' },
    { imageUrl: 'https://s3-pi2-gp2-wowfunding.s3.amazonaws.com/DDHHEnAccion/PortadaDDHHEnAccion.jpg', text: 'DD.HH. en acción' },
    { imageUrl: 'https://s3-pi2-gp2-wowfunding.s3.amazonaws.com/CARRUSEL/3Carrusel.jpg', text: 'Brinda la posibilidad de que más personas tengan acceso a las últimas tecnologías' },
    { imageUrl: 'https://s3-pi2-gp2-wowfunding.s3.amazonaws.com/ExploraCiencia/PortadaExploraCiencia.jpg', text: 'Sin ciencia no hay futuro ¡Haz tu aporte!' },
    { imageUrl: 'https://s3-pi2-gp2-wowfunding.s3.amazonaws.com/NuevosHorizontes/PortadaNuevosHorizontes.jpg', text: 'Un turismo sustentable es el posible' },
    { imageUrl: 'https://s3-pi2-gp2-wowfunding.s3.amazonaws.com/ArteEnLaCalle/Img2ArteEnLaCalle.jpg', text: 'Apoya el arte local' },
];

// const ImageCarousel = () => {

//     const handleLabelClick = (index: any) => {

//     };
//     return (
//         <Carousel showThumbs={false} showStatus={false} autoPlay stopOnHover infiniteLoop={true} swipeable>
//             {items.map((item, index) => (
//                 <div key={index}
//                     style={{ height: "700px" }}
//                 >
//                     <Image src={item}
//                         width={1920}
//                         height={700}
//                         alt={`Imagen ${index + 1}`}
//                     />
//                     <p style={{
//                         position: 'absolute',
//                         bottom: '40px',
//                         left: '0%',
//                         // marginLeft: '-45%',
//                         width: '100%',
//                         borderRadius: '10px',
//                         background: '#09ac8bcf',
//                         padding: '8px',
//                         fontSize: '12px',
//                         textAlign: 'center',
//                         opacity: '1',
//                     }}>
                        
//                         <NextLink href="/login" passHref>
//                             <MUILink variant="h6" style={{ color: "white", fontWeight: "bold" }}>Descubre más proyectos</MUILink>
//                         </NextLink>
//                     </p>
//                 </div>
//             ))
//             }
//         </Carousel >
//     );
// }

//TODO Descubre más proyectos Si queda tiempo hacer link página con filtros 

const ImageCarousel = () => {
    return (
        <Carousel showThumbs={false} showStatus={false} autoPlay stopOnHover infiniteLoop swipeable>
            {items.map((item, index) => (
                <div key={index} style={{ height: '700px', position: 'relative' }}>
                    <Image
                        src={item.imageUrl}
                        width={1920}
                        height={700}
                        alt={`Imagen ${index + 1}`}
                    />
                    <div
                        style={{
                            position: 'absolute',
                            bottom: '40px',
                            left: '50%',
                            transform: 'translateX(-50%)',
                            width: '100%',
                            borderRadius: '10px',
                            background: '#09ac8bcf',
                            padding: '8px',
                            fontSize: '12px',
                            textAlign: 'center',
                            opacity: '1',
                        }}
                    >
                        <Typography variant="h6" style={{ color: 'white', fontWeight: 'bold' }}>
                        {item.text}
                        </Typography>
                    </div>
                </div>
            ))}
        </Carousel>
    );
};

export default ImageCarousel;