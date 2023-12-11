import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import CustomForm from '../customForm/CustomForm.component';

const steps = ["Nombre del proyecto", "Quiénes somos", "El Proyecto", "Conclusión", "Fija Objetivos"];

interface Props {
    
}

export default function HorizontalLinearStepper(props: Props) {
    const [activeStep, setActiveStep] = React.useState(0);
    const [skipped, setSkipped] = React.useState(new Set<number>());

    const isStepSkipped = (step: number) => {
        return skipped.has(step);
    };

    const handleNext = () => {
        let newSkipped = skipped;
        if (isStepSkipped(activeStep)) {
            newSkipped = new Set(newSkipped.values());
            newSkipped.delete(activeStep);
        }

        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        setSkipped(newSkipped);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };



    const handleReset = () => {
        setActiveStep(0);
    };

    return (
        <Box sx={{ width: '80%', display: "flex", flexDirection: "column", alignCenter: "center", marginTop:"3em" }}>
            <Stepper activeStep={activeStep}>
                {steps.map((label) => {
                    return (
                        <Step key={label}>
                            <StepLabel >{label}</StepLabel>
                        </Step>
                    );
                })}
            </Stepper>
            {activeStep === steps.length ? (
                //cuando esta todo completo
                <>
                    <Typography sx={{ mt: 2, mb: 1 }}>
                        Todos los pasos finalizados correctamente!
                    </Typography>
                    <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                        <Box sx={{ flex: '1 1 auto' }} />
                        <Button onClick={handleReset}>Reiniciar</Button>
                    </Box>
                </>
            ) : (
                <>
                    <CustomForm activeStep={activeStep}/>

                    <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                        <Button
                            color="inherit"
                            disabled={activeStep === 0}
                            onClick={handleBack}
                            sx={{ mr: 1 }}
                        >
                            Atras
                        </Button>
                        <Box sx={{ flex: '1 1 auto' }} />

                        <Button onClick={handleNext} disabled={activeStep === steps.length - 1}>
                            {activeStep === steps.length - 1 ? '' : 'siguiente'}
                        </Button>
                    </Box>
                </>
            )}
        </Box>
    );
}
