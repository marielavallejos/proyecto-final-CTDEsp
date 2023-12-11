
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { useState } from 'react';

// interface Props {
//     valoresParam: [string],
//     valoresTexto:string,
//     handleFiltro: void,

// }

const BasicSelect = ({ valoresTexto, handleFiltro }: any) => {

    const [valores, setValores] = useState("")

    const handleChange = (event: SelectChangeEvent) => {
        setValores(event.target.value as string);
        handleFiltro(event.target.value)
    };

    return (
        <Box sx={{ minWidth: 200 }}>
            <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">{valoresTexto}</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={valores}
                    label="Categorias"
                    onChange={handleChange}
                >
                    <MenuItem value="medio ambiente" >Medio Ambiente</MenuItem>
                    <MenuItem value="educacion">Educación</MenuItem >
                    <MenuItem value="arte">Arte</MenuItem >
                    <MenuItem value="salud ">Salud</MenuItem >
                    <MenuItem value="tecnologia">Tecnología</MenuItem >
                    <MenuItem value="deportes">Deportes</MenuItem >
                    <MenuItem value="ciencia">Ciencia</MenuItem >
                    <MenuItem value="derechos humanos">Derechos Humanos</MenuItem >
                    <MenuItem value="viajes">Viajes</MenuItem >

                </Select>
            </FormControl>
        </Box>
    );
}
export default BasicSelect