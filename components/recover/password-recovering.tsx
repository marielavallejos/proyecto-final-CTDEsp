// import React from 'react'
import { Button, Grid, Snackbar, Typography } from '@mui/material';
import { useForm } from 'react-hook-form';
import NextLink from 'next/link'
import { Link as MUILink } from '@mui/material';
import { ErrorMessage } from '@hookform/error-message';
import * as yup from "yup";
import { yupResolver } from '@hookform/resolvers/yup';
import { schema } from '../layouts/login/schema';
import { CustomTextField } from '../layouts/ui/custom-text-field-props';
import { useRouter } from 'next/router'
import { useState } from 'react';

const RecoverForm = () => {
    const router = useRouter();
    const [error, setError] = useState<string | null>(null);
    type DataForm = yup.InferType<typeof schema>
    const [openSnackbar, setOpenSnackbar] = useState(false);

    const {
        control,
        register,
        formState: { errors },
        handleSubmit,
        getValues,
    } = useForm<DataForm>({ resolver: yupResolver(schema), defaultValues: {} });

    const onSubmit = async (data: any) => {
        const dataValues = getValues()
        
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
            <Grid sx={{ backgroundColor: "#4bc6b929" }} padding={8} >
                

                <form onSubmit={handleSubmit(onSubmit)}>
                    <Grid
                        container
                        direction="column"
                        gap={1}
                        marginTop={3}
                    >

                        <Typography variant='body1'>
                        Ingresá la dirección de correo electrónico que usaste para registrarte y te enviaremos un link para restablecer tu contraseña
                        </Typography>
                        <CustomTextField
                            name="email"
                            label="Correo"
                            type="text"
                            control={control}
                        />
                        <Typography variant='caption' color='red'>
                            <ErrorMessage errors={errors} name="username" />
                        </Typography>
                        
                        <Typography variant='caption' color='red'>
                            <ErrorMessage errors={errors} name="password" />
                        </Typography>
                        <Button type='submit' size='large' variant="contained" color="primary" sx={{ fontWeight: "bold", marginTop: "4px", marginBottom: "10px" }} >Enviar</Button>
                    </Grid>
                </form>
                

                <Snackbar
                    open={openSnackbar}
                    autoHideDuration={6000}
                    onClose={handleCloseSnackbar}
                    message={error || "Error al recuperar sesion. Intente nuevamente."}
                />
            </Grid>
        </Grid >
    )
}

export default RecoverForm