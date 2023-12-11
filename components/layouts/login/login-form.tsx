
import { Button, Grid, Snackbar, Typography } from '@mui/material';
import { useForm } from 'react-hook-form';
import NextLink from 'next/link'
import { Link as MUILink } from '@mui/material';
import { ErrorMessage } from '@hookform/error-message';
import * as yup from "yup";
import { yupResolver } from '@hookform/resolvers/yup';
import { schema } from './schema';
import { CustomTextField } from '../ui/custom-text-field-props';
import { useRouter } from 'next/router'
import { useState } from 'react';
import { postLogin } from 'services/sesion/user-sesion.service';
import { useAuth } from 'context/AuthContext';

const LoginForm = () => {
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

    const { setUser } = useAuth();

    const onSubmit = async (data: any) => {
        const dataValues = getValues()
        const response = await postLogin(dataValues);
        try {
            if (!response.error) {
                setUser((prevUser) => ({ ...prevUser, ...response.user }));

                // Retrasar el push a la landing page por 2 segundos
                setTimeout(() => {
                    router.push('/');
                }, 3000);
            } else {

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
            <Grid sx={{ backgroundColor: "#4bc6b929" }} padding={8} >
                <Typography variant='h2' textAlign="center" fontWeight="bold">Inicio Sesión</Typography >
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
                    Todavia no te registraste?

                    <NextLink href="/registro" passHref>
                        <MUILink variant="body2" sx={{ fontSize: 18, marginRight: 5 }}> Regístrate aqui</MUILink>
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
                            Usuario*
                        </Typography>
                        <CustomTextField
                            name="username"
                            label="Usuario"
                            type="text"
                            control={control}
                        />
                        <Typography variant='caption' color='red'>
                            <ErrorMessage errors={errors} name="username" />
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
                        <Button type='submit' size='large' variant="contained" color="primary" sx={{ fontWeight: "bold", marginTop: "4px", marginBottom: "10px" }} >INICIAR SESION</Button>
                    </Grid>
                </form>
                <NextLink href="/" passHref>
                    <MUILink variant="body2">¿Olvidaste tu contraseña?</MUILink>
                </NextLink>

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

export default LoginForm