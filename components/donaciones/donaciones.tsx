import { Button, Grid, InputLabel, MenuItem, Snackbar, ThemeProvider, Typography, createTheme } from '@mui/material';
import { CustomTextField } from '../layouts/ui/custom-text-field-props';
import { ErrorMessage } from '@hookform/error-message';
import * as yup from "yup";
import { useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import Image from 'next/image';
import { schema } from './schema';
import { buscarMultimediaPorTipo, obtenerFechaActualFormateada } from 'utils/utils';
import { postDonacionApi, postDonaciones } from 'services/donaciones/donaciones.service';
import { useRouter } from 'next/router';
import { Donaciones } from 'interfaces/donaciones.type';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { getProyectoById } from 'services/proyectos/proyectos.service';
import { ProyectoFinal } from 'interfaces/proyect.type';
import { Spinner } from 'components/layouts/ui/spinner';
import { useAuth } from 'context/AuthContext';

const DonacionesForm = () => {
    const { token } = useAuth();
    const { user }=useAuth();
    const router = useRouter();
    const { id } = router.query;
    const [error, setError] = useState<string | null>(null);
    type DataForm = yup.InferType<typeof schema>
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [pago, setPago] = useState('11');
    const [proyecto, setProyecto] = useState<ProyectoFinal>()


    const {
        control,
        formState: { errors },
        handleSubmit,
        getValues,
    } = useForm<DataForm>({ resolver: yupResolver(schema), defaultValues: {} });

    const onSubmit = async (data: any) => {
        const dataValues = getValues();
        const comentario = dataValues.comentario ?? "";

        const dataDonacion: Donaciones =
        {
            id: 1,
            comentario,
            cantidad: parseFloat(dataValues.cantidad),
            fechaDonacion: obtenerFechaActualFormateada(),
            metodoPagoID: {
                id: parseInt(pago)
            },
            idUsuarios: user?.id || 18,
            idProductos: proyecto?.id || 23
        }

        const response = await postDonacionApi(dataDonacion, token || "");

        try {
            if (!response.error) {
                setError(`Su donacion se realizo con exito`);
                setOpenSnackbar(true);
                setTimeout(() => {
                    router.push("/mis-donaciones-proyectos");
                }, 2000);
            } else {

                setError(`${response.error}- - -${response.message}`);
                setOpenSnackbar(true);
            }

        } catch (error: any) {
            setError(`${response.error}- - -${response.message}`);
            setOpenSnackbar(true);
        }
    };
    const handleCloseSnackbar = () => {
        setOpenSnackbar(false);
    };


    const handleChange = (event: SelectChangeEvent) => {
        setPago(event.target.value as string);
    };

    useEffect(() => {
        if (typeof id === 'string' || typeof id === 'number') {
            const idNumber = typeof id === 'string' ? parseInt(id, 10) : id;

            if (idNumber) {
                getProyectoById(idNumber).then((data) => {
                    setProyecto(data)
                });
            }
        }

    }, [id]);

    if (!proyecto) {
        return (

            <Grid sx={{ width: '100vw', height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Spinner />
            </Grid>
        );
    }




    return (<Grid container spacing={0} sx={{ maxWidth: "950px" }}>
        <Grid container sx={{ display: "flex", justifyContent: "center", marginTop: 6 }} spacing={1}>
            <Grid item xs={6}>
                <Image src={buscarMultimediaPorTipo(proyecto?.multimedias || [{ id: 1, tipo: 1, url: "https://placekitten.com/239/136" }], 1)} width={440} height={220} alt="Perfil" />
                <Typography variant='h6' sx={{ fontWeight: "400", marginTop: 2 }}>
                    {proyecto?.nombre}
                </Typography>
                <Typography variant='body1' sx={{ fontWeight: "400", marginTop: 1 }}>
                    Tu contribucion suma a que esta campaña alcanze su objetivo
                </Typography>
            </Grid>

            <Grid item xs={6}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Grid
                        container
                        direction="column"
                        gap={1}
                    >

                        <Typography variant='body1'>
                            Indique la cantidad a donar
                        </Typography>
                        <CustomTextField
                            name="cantidad"
                            label="$"
                            type="number"
                            control={control}
                        />
                        <Typography variant='caption' color='red'>
                            <ErrorMessage errors={errors} name="cantidad" />
                        </Typography>

                        <Typography variant='body1'>
                            Dejar un comentario
                        </Typography>
                        <CustomTextField
                            name="comentario"
                            label="Comentario"
                            type="text"
                            control={control}
                        />
                        <Typography variant='caption' color='red'>
                            <ErrorMessage errors={errors} name="comentario" />
                        </Typography>

                        <InputLabel id="demo-simple-select-label">Forma de pago</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={pago}
                            label="Age"
                            onChange={handleChange}
                        >
                            <MenuItem value={11}>Tarjeta</MenuItem>
                            <MenuItem value={13}>Paypal</MenuItem>
                            <MenuItem value={12}>Mercado Pago</MenuItem>
                        </Select>
                        <Button type='submit' size='large' variant="contained" color="primary" sx={{ fontWeight: "bold" }} >Aceptar</Button>
                    </Grid>
                </form>
            </Grid>
        </Grid>

        <Grid container>
            <Snackbar
                open={openSnackbar}
                autoHideDuration={6000}
                onClose={handleCloseSnackbar}
                message={error || ""} //TODO  modificar modal para notificaciones
            />

        </Grid>

    </Grid>)
}

export default DonacionesForm;