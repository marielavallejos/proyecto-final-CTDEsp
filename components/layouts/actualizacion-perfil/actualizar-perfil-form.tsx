// import React from 'react'
import { Button, Grid, Snackbar, TextField, Typography, Avatar } from '@mui/material';
import NextLink from 'next/link'
import { Link as MUILink } from '@mui/material';
import { ErrorMessage } from '@hookform/error-message';
import * as yup from "yup";
import { yupResolver } from '@hookform/resolvers/yup';
import { schema } from './schema';
import { CustomTextField } from '../ui/custom-text-field-props';
import { useRouter } from 'next/router'
import { useState } from 'react';
import { postRegistro, postActualizacion } from 'services/sesion/user-sesion.service';
import { useForm } from 'react-hook-form';


const ActualizarPerfilForm = () => {
    const router = useRouter();
    const [error, setError] = useState<string | null>(null);
    type DataForm = yup.InferType<typeof schema>
    const [openSnackbar, setOpenSnackbar] = useState(false);

    const {
        control,
        formState: { errors },
        handleSubmit,
        getValues,
    } = useForm<DataForm>({ resolver: yupResolver(schema), defaultValues: {} });

    const onSubmit = async (data: any) => {
        const dataValues = getValues()
        const response = await postActualizacion(dataValues);
        try {
            if (!response.error) {
                
                router.push('/registro-exitoso');
            }
            else {
                
                setError(`${response.error}- - -${response.message}`);
                setOpenSnackbar(true);
            }
        }
        catch (error: any) {
            setError(`${response.error}- - -${response.message}`);
            setOpenSnackbar(true);
        }
    };

    const handleCloseSnackbar = () => {
        setOpenSnackbar(false);
    };

    return (
        <Grid
            container
            spacing={0}
            direction="column"
            alignItems="left"
            marginTop={5}
            sx={{ maxWidth: "800px" }}>
                
            <Grid item padding={3} >
                <Typography variant='h6' textAlign="left" fontWeight="bold">Configuración de la cuenta</Typography >

                <Typography variant='body1' textAlign="center" fontWeight="bold" marginTop={3}>Foto de perfil</Typography >
                <Avatar
                alt="profile photo"
                src="https://static.vecteezy.com/system/resources/previews/026/619/142/original/default-avatar-profile-icon-of-social-media-user-photo-image-vector.jpg"
                sx={{ width: 100, height: 100, marginLeft:"auto", marginRight:"auto" }}
                />
                

                <form onSubmit={handleSubmit(onSubmit)}>
                    <Grid
                        container
                        direction="column"
                        gap={1}
                        marginTop={3}
                    >

                        <Typography variant='body1'>
                            Nombre*
                        </Typography>
                        <CustomTextField
                            name="name"
                            label="Name"
                            type="text"
                            control={control}
                        />
                        <Typography variant='caption' color='red'>
                            <ErrorMessage errors={errors} name="name" />
                        </Typography>

                        <Typography variant='body1'>
                            Apellido*
                        </Typography>
                        <CustomTextField
                            name="lastname"
                            label="lastname"
                            type="text"
                            control={control}
                        />
                        <Typography variant='caption' color='red'>
                            <ErrorMessage errors={errors} name="lastname" />
                        </Typography>

                        <Typography variant='body1'>
                            Pais*
                        </Typography>
                        <CustomTextField
                            name="country"
                            label="Pais"
                            type="text"
                            control={control}
                        />
                        <Typography variant='caption' color='red'>
                            <ErrorMessage errors={errors} name="country" />
                        </Typography>

                        <Typography variant='body1'>
                            Número de celular*
                        </Typography>
                        <CustomTextField
                            name="phone"
                            label="Telefono"
                            type="text"
                            control={control}
                        />
                        <Typography variant='caption' color='red'>
                            <ErrorMessage errors={errors} name="phone" />
                        </Typography>


                        <Typography variant='body1'>
                            Email*
                        </Typography>
                        <CustomTextField
                            name="email"
                            label="Email"
                            type="email"
                            control={control}
                        />
                        <Typography variant='caption' color='red'>
                            <ErrorMessage errors={errors} name="email" />
                        </Typography>


                        <Button type='submit' size='large' variant="contained" color="primary" sx={{ fontWeight: "bold", marginTop: "4px", marginBottom: "10px" }} >Guardar</Button>
                    </Grid>
                </form>

                <Snackbar
                    open={openSnackbar}
                    autoHideDuration={6000}
                    onClose={handleCloseSnackbar}
                    message={error || "Error al iniciar sesion. Intente nuevamente."}
                />

            </Grid>
        </Grid >
    )
}

export default ActualizarPerfilForm