// import React from 'react'
import { Button, Grid, Snackbar, TextField, Typography } from '@mui/material';
import NextLink from 'next/link'
import { Link as MUILink } from '@mui/material';
import { ErrorMessage } from '@hookform/error-message';
import * as yup from "yup";
import { yupResolver } from '@hookform/resolvers/yup';
import { schema } from './schema';
import { CustomTextField } from '../ui/custom-text-field-props';
import { useRouter } from 'next/router'
import { useState } from 'react';
import { postRegistro, postRegistroApi } from 'services/sesion/user-sesion.service';
import { useForm } from 'react-hook-form';


const RegistroForm = () => {
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
        
        const response = await postRegistro(dataValues);
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
            alignItems="center"
            marginTop={10}>
            <Grid item sm={10} lg={10} sx={{ backgroundColor: "#4bc6b929" }} padding={8} >
                <Typography variant='h2' textAlign="center" fontWeight="bold">Registro</Typography >
                <Typography sx={{
                    height: "4px",
                    width: "100px",
                    display: "block",
                    margin: "0px auto 0",
                    backgroundColor: "#ff3366"
                }}

                >
                </Typography>
                <Typography
                    variant='body1'
                    marginTop={2}>
                    Ya tienes una cuenta?
                    <NextLink href="/login" passHref>
                        <MUILink variant="body2" sx={{ fontSize: 18, marginRight: 5 }}> Ingresa aqui</MUILink>
                    </NextLink>
                </Typography >

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
                            label="Nombre"
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
                            label="Apellido"
                            type="text"
                            control={control}
                        />
                        <Typography variant='caption' color='red'>
                            <ErrorMessage errors={errors} name="lastname" />
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


                        <Typography variant='body1'>
                            Contraseña*
                        </Typography>
                        <CustomTextField
                            name="password"
                            label="Contraseña"
                            type="password"
                            control={control}
                        />
                        <Typography variant='caption' color='red'>
                            <ErrorMessage errors={errors} name="password" />
                        </Typography>


                        <Button type='submit' size='large' variant="contained" color="primary" sx={{ fontWeight: "bold", marginTop: "4px", marginBottom: "10px" }} >REGISTRARME</Button>
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

export default RegistroForm