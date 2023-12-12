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
import { postRegistro, postActualizacion, postActualizacionApi } from 'services/sesion/user-sesion.service';
import { useForm } from 'react-hook-form';
import { useAuth } from 'context/AuthContext';
import { Spinner } from 'components/layouts/ui/spinner';

const ActualizarPerfilForm = () => {
    const {user, setUser} = useAuth();
    const [userForm, setUserForm] = useState(user?{
        name: user.name,
        lastname: user.lastname,
        email: user.email,
        profileUrl: user.profileUrl,
        password: "",
        userType: {
          id: 1
        }
      }: {
        name: "user",
        lastname: "user",
        email: "user",
        profileUrl: "user",
        password: "user",
        userType: {
          id: 1
        }
      })
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
        const updatedData = {
            ...userForm,  // Datos previos en userForm
            name: dataValues.name || userForm.name,
            lastname: dataValues.lastname || userForm.lastname,
            email: dataValues.email || userForm.email,
            password: dataValues.password || "@dmin123",
            // Asegúrate de agregar otros campos según sea necesario
          };
        const response = await postActualizacionApi(updatedData);
        if (response.status == 200) {

            const updatedDataUser = {
                ...userForm, 
                id: user?.id,
                userType: {
                    id:1,
                    name: "USER"
                },
                name: dataValues.name || userForm.name,
                lastname: dataValues.lastname || userForm.lastname,
                email: dataValues.email || userForm.email,
       

              };
              setUser(updatedDataUser)
        }
        try {
            if (response) {
                
                setError(`Informacion actualizada con exito`);
                setOpenSnackbar(true);
            }
        }
        catch (error: any) {
            setError(`${response}- - -${response}`);
            setOpenSnackbar(true);
        }
    };

    const handleCloseSnackbar = () => {
        setOpenSnackbar(false);
    };

    if (!user) {
        return <Spinner />
    }

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
                            defaultValue={user?.name}
                            name="name"
                            label=""
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
                        defaultValue={user?.lastname}
                            name="lastname"
                            label=""
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
                        defaultValue={user?.email}
                            name="email"
                            label=""
                            type="email"
                            control={control}
                        />
                        <Typography variant='caption' color='red'>
                            <ErrorMessage errors={errors} name="email" />
                        </Typography>

                        <Typography variant='h6'>
                            Para confirmar cambios ingrese su contraseña*
                        </Typography>
                        <CustomTextField
                            name="password"
                            label=""
                            type="password"
                            control={control}
                        />
                        <Typography variant='caption' color='red'>
                            <ErrorMessage errors={errors} name="password" />
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