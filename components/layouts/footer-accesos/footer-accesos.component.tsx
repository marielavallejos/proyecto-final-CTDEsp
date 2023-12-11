import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';

const FooterAccesos = () => {
  const boxStyles = {
    margin: '18px', 
};
const containerStyles = {
  maxWidth: '100%', 
};
    return (
        <Container style={containerStyles}>
		<Grid container spacing={20}>
        <Grid item xs={12} sm={4}>
          <Box style={boxStyles}>
            <Typography variant="h5" component="h5">Ayuda</Typography>
          </Box>
		      <Box style={boxStyles}>
            <Link href="/centro-de-ayuda" underline="hover">Centro de ayuda</Link>
          </Box>
          <Box style={boxStyles}>
            <Link href="/preguntas-frecuentes" underline="hover">Preguntas frecuentes</Link>
          </Box>
          <Box style={boxStyles}>
            <Link href="/informacion-legal" underline="hover">Información legal</Link>
          </Box>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Box style={boxStyles}>
            <Typography variant="h5" component="h5">Funcionamiento</Typography>
          </Box>
		      <Box style={boxStyles}>
            <Link href="/como-funciona" underline="hover">Cómo funciona</Link>
          </Box>
          <Box style={boxStyles}>
            <Link href="/ideas" underline="hover">Ideas para recaudar fondos</Link>
          </Box>


		  <Box style={boxStyles}>
            <Link href="/alianzas" underline="hover">Alianzas estratégicas</Link>
          </Box>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Box style={boxStyles}>
            <Typography variant="h5" component="h5">Acerca de WowFunding</Typography>
          </Box>
		  <Box style={boxStyles}>
            <Link href="/quienes-somos" underline="hover">Quienes somos</Link>
          </Box>
          <Box style={boxStyles}>
            <Link href="/prensa" underline="hover">Prensa</Link>
          </Box>
        </Grid>
      </Grid>
		</Container>
    )
}
export default FooterAccesos