import React, { FC } from 'react'

import { useForm, Controller, SubmitHandler } from "react-hook-form";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { Button, FormControl, InputLabel, MenuItem, Snackbar, Alert, Grid } from "@mui/material";
import { useState } from 'react';
import { useRouter } from 'next/router';
import { ProjectInput } from 'checkout/checkout.types';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { styled } from '@mui/material/styles';
import { postProyecto, postProyectoAPI } from 'services/proyectos/proyectos.service';
import { ProyectoFinal, ListaDescripciones, Categoria, ListaMultimedias } from 'interfaces/proyect.type';
import { useAuth } from 'context/AuthContext';


interface Props {
    activeStep: number,
}

const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
  });

const STEP_TEXTS =
    [
        {
            title: "¡Empecemos!",
            subtitle: "Es importante que la descripción corta y la imagen de portada sean llamativos para que los usuarios quieran saber más"
        },
        {
            title: "Quiénes somos",
            subtitle: " Contále al mundo quién está detrás de este proyecto"
        },
        {
            title: "El proyecto",
            subtitle: "Contá detalladamente de que trata el proyecto. ¿Cómo se va a desarrollar?"
        },
        {
            title: "Conclusión",
            subtitle: "Explicale a los usuarios cuáles es el objetivo final de recaudación y algunas conclusiones finales"
        },
        {
            title: " Fijá objetivos",
            subtitle: "Indicá el monto total que necesita el proyecto y las fechas"
        },
    ]

const CustomForm: FC<Props> = ({ activeStep }) => {
    const {user} = useAuth();

    const {
        control,
        register,
        formState: { errors },
        handleSubmit,
        getValues,
        trigger
    } = useForm<ProjectInput>();

    const router = useRouter();
    const [open, setOpen] = useState(false);
    const [mensaje, setMensaje] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [category, setCategory] = React.useState('8');
    const [openSnackbar, setOpenSnackbar] = useState(false);

    const handleClose = () => {
        setOpen(false);
    };

    const onSubmit: SubmitHandler<ProjectInput> = async (data) => {
        
        const descripcionesL: ListaDescripciones[] = [
            {
                tipo: 1,
                descripcion: data.project.description_short
            },
            {
                tipo: 2,
                descripcion: data.project.about_us
            },
            {
                tipo: 3,
                descripcion: data.project.description_large
            },
            {
                tipo: 4,
                descripcion: data.project.conclusion
            }
        ];

        const categoria: Categoria = {
            id:parseInt(category),
        }

        const multimediasL: ListaMultimedias[] = [
            {
                tipo: 1,
                url: data.project.image
            },
            {
                tipo: 2,
                url: data.project.image2
            },
            {
                tipo: 3,
                url: data.project.image3
            },
            {
                tipo: 4,
                url: data.project.image4
            }
        ];

        const proyecto: ProyectoFinal = {
            categoriasId: categoria,
            descripciones: descripcionesL,
            fechaPublicacion: `${data.project.startDate} 00:00:00`,
            fechaFinalizacion: `${data.project.endDate} 00:00:00`,   
            monto: data.project.amount,  
            montoSumatoriaDonaciones: 0,  
            multimedias: multimediasL,
            nombre: data.project.name,
            usuariosId: user?.id 
        };

        const response = await postProyectoAPI(proyecto);

        try {
            if (!response.error) {
                setError(`Su proyecto fue creado con exito`);
                setOpenSnackbar(true);
                router.push("/")
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

    const handleOutsideButtonClick = async () => {
        try {
          await trigger(); // Lanza la validación de errores
        } catch (error) {
          console.error('Error de validación:', error);
        }
      };

    const handleSelectChange = (event: SelectChangeEvent) => {
        setCategory(event.target.value as string);
      };

    return (
        <Grid container spacing={3} sx={{ alignSelf: "center", marginTop: "2rem", display: "flex" }}>
            <Grid item xs={4}>
                < Typography variant='body1' sx={{ fontSize: "18px", fontWeight: "400" }}>
                    {STEP_TEXTS[activeStep].title}
                </Typography>

                <Typography variant='body1' sx={{ fontSize: "17px", fontWeight: "400", marginTop: "2em" }}>
                    {STEP_TEXTS[activeStep].subtitle}
                </Typography>
            </Grid >
            <Grid item xs={8}>
                <Paper
                    elevation={8}
                    sx={{ p: "32px", display: "flex", flexDirection: "column", gap: 3 }}
                >
                    <form onSubmit={handleSubmit(onSubmit)}>
                        {activeStep === 0 && (
                            <>
                                <label>Nombre del proyecto</label>
                                <Controller
                                    name="project.name"
                                    control={control}
                                    defaultValue={""}
                                    rules={{ required: 'Este campo es obligatorio' }}
                                    render={({ field }: any) => (
                                        <TextField
                                            {...field}
                                            type="text"
                                            variant="outlined"
                                            fullWidth
                                            error={!!errors.project?.name}
                                            helperText={errors.project?.name?.message}
                                            sx={{ mb: 2 }}
                                        />
                                    )}
                                />
                                <label>Seleccioná la categoria</label>
                                <Controller
                                    name="project.category"
                                    control={control}
                                    rules={{ required: true }}
                                    render={({ field }) => (
                                        <Select
                                            {...field}
                                            variant="outlined"
                                            fullWidth
                                            onChange={handleSelectChange}
                                            defaultValue='8'
                                            sx={{ mb: 2 }}>
                                            <MenuItem  value={8} >Medio Ambiente</MenuItem>            
                                            <MenuItem  value={9}>Educación</MenuItem >            
                                            <MenuItem  value={10}>Arte</MenuItem >            
                                            <MenuItem  value={11}>Salud</MenuItem >            
                                            <MenuItem  value={12}>Tecnología</MenuItem >            
                                            <MenuItem  value={13}>Deportes</MenuItem >            
                                            <MenuItem  value={14}>Ciencia</MenuItem >            
                                            <MenuItem  value={15}>Derechos Humanos</MenuItem >            
                                            <MenuItem  value={16}>Viajes</MenuItem >            
                                        </Select>
                                    )}
                                />

                                <label>Descripción corta</label>

                                <Controller
                                    name="project.description_short"
                                    control={control}
                                    defaultValue={""}
                                    rules={{ required: true }}
                                    render={({ field }: any) => (
                                        <TextField
                                            {...field}
                                            type="text"
                                            variant="outlined"
                                            fullWidth
                                            multiline
                                            rows={4}
                                            sx={{ mb: 2 }}
                                        />
                                    )}
                                />
                                <label>Imagen portada</label>
                                <Controller
                                    name="project.image"
                                    control={control}
                                    defaultValue={""}
                                    rules={{ required: true }}
                                    render={({ field }: any) => (
                                        <TextField
                                            {...field}
                                            type="text"
                                            variant="outlined"
                                            fullWidth
                                            error={!!errors.project?.image}
                                            helperText={errors.project?.name?.message}
                                            sx={{ mb: 2 }}
                                        />
                                    )}
                                />


                            </>

                        )
                        }

                        {activeStep === 1 && (
                            <>
                                <label>Descripción</label>

                                <Controller
                                    name="project.about_us"
                                    control={control}
                                    defaultValue={""}
                                    rules={{ required: true }}
                                    render={({ field }: any) => (
                                        <TextField
                                            {...field}
                                            type="text"
                                            variant="outlined"
                                            fullWidth
                                            multiline
                                            rows={10}
                                            sx={{ mb: 2 }}
                                        />
                                    )}
                                />

                                <label>Imagen </label>
                                <Controller
                                    name="project.image2"
                                    control={control}
                                    defaultValue={""}
                                    rules={{ required: true }}
                                    render={({ field }: any) => (
                                        <TextField
                                            {...field}
                                            type="text"
                                            variant="outlined"
                                            fullWidth
                                            error={!!errors.project?.image2}
                                            helperText={errors.project?.image2?.message}
                                            sx={{ mb: 2 }}
                                        />
                                    )}
                                />


                            </>

                        )
                        }

                        {activeStep === 2 && (
                            <>
                                <label>Descripción</label>

                                <Controller
                                    name="project.description_large"
                                    control={control}
                                    defaultValue={""}
                                    rules={{ required: true }}
                                    render={({ field }: any) => (
                                        <TextField
                                            {...field}
                                            type="text"
                                            variant="outlined"
                                            fullWidth
                                            multiline
                                            rows={10}
                                            sx={{ mb: 2 }}
                                        />
                                    )}
                                />

                                <label>Imagen </label>
                                <Controller
                                    name="project.image3"
                                    control={control}
                                    defaultValue={""}
                                    rules={{ required: true }}
                                    render={({ field }: any) => (
                                        <TextField
                                            {...field}
                                            type="text"
                                            variant="outlined"
                                            fullWidth
                                            error={!!errors.project?.image3}
                                            helperText={errors.project?.image3?.message}
                                            sx={{ mb: 2 }}
                                        />
                                    )}
                                />


                            </>

                        )
                        }

                        {activeStep === 3 && (
                            <>
                                <label>Descripción</label>

                                <Controller
                                    name="project.conclusion"
                                    control={control}
                                    defaultValue={""}
                                    rules={{ required: true }}
                                    render={({ field }: any) => (
                                        <TextField
                                            {...field}
                                            type="text"
                                            variant="outlined"
                                            fullWidth
                                            multiline
                                            rows={10}
                                            sx={{ mb: 2 }}
                                        />
                                    )}
                                />

                                <label>Imagen </label>
                                <Controller
                                    name="project.image4"
                                    control={control}
                                    defaultValue={""}
                                    rules={{ required: true }}
                                    render={({ field }: any) => (
                                        <TextField
                                            {...field}
                                            type="text"
                                            variant="outlined"
                                            fullWidth
                                            error={!!errors.project?.image4}
                                            helperText={errors.project?.image4?.message}
                                            sx={{ mb: 2 }}
                                        />
                                    )}
                                />


                            </>

                        )
                        }

                        {activeStep === 4 && (
                            <>
                                <label>Fecha Inicio</label>
                                <br></br>
                                <Controller
                                    name="project.startDate"
                                    control={control}
                                    rules={{ required: true }}
                                    render={({ field }: any) => (
                                        <input
                                        {...field}
                                        style={{ width: '100%', height: '56px', borderRadius: '6px', border: '1px solid #8080808c', padding:'10px'}} 
                                        type="date" 
                                        id="start" />
                                    )}
                                />
                                <br></br><br></br>

                                <label>Fecha finalización</label>
                                <br></br>
                                <Controller
                                    name="project.endDate"
                                    control={control}
                                    rules={{ required: true }}
                                    render={({ field }: any) => (
                                        <input
                                        {...field}
                                        style={{ width: '100%', height: '56px', borderRadius: '6px', border: '1px solid #8080808c', padding:'10px'}} 
                                        type="date" 
                                        id="start" />
                                    )}
                                />
                                <br></br><br></br>
                                <label>Monto total a recaudar</label>
                                <Controller
                                    name="project.amount"
                                    control={control}
                                    defaultValue={0}
                                    rules={{ required: true }}
                                    render={({ field }: any) => (
                                        <TextField
                                            {...field}
                                            type="text"
                                            variant="outlined"
                                            fullWidth
                                            sx={{ mb: 2 }}
                                        />
                                    )}
                                />
                                <Box>
                                    <Button
                                        type="submit"
                                        variant="contained"
                                        color="primary"
                                        sx={{ mt: 2 }}
                                    >
                                        Enviar
                                    </Button>
                                </Box>

                            </>

                        )
                        }
                    </form>
                </Paper>

            </Grid>

            <Grid container>
            <Snackbar
                open={openSnackbar}
                autoHideDuration={6000}
                onClose={handleCloseSnackbar}
                message={error || ""} //TODO  modificar modal para notificaciones
            />

            </Grid>
        </Grid >

        
    )
}

export default CustomForm