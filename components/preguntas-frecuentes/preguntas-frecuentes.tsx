import { Typography } from "@mui/material";


const PreguntasFrecuentes = () => {
  return (
    <>

      <Typography variant="h5" component="h5" gutterBottom>
        ¿Cómo puedo realizar una donación?
      </Typography>
      <Typography variant="body1" gutterBottom>
        Para donar, simplemente selecciona el proyecto que te interesa, elige la cantidad que deseas donar y sigue los pasos para completar la transacción. Aceptamos varios métodos de pago seguros para tu comodidad.
      </Typography>


      <Typography variant="h5" component="h5" gutterBottom>
        ¿Qué sucede si el proyecto no alcanza su objetivo de financiamiento?
      </Typography>
      <Typography variant="body1" gutterBottom>
        En el caso de que un proyecto no alcance su meta de financiamiento, se dará la opción al creador del proyecto de extender la fecha de finalización o de quedarse con el dinero recaudado hasta ese momento.
      </Typography>


      <Typography variant="h5" component="h5" gutterBottom>
        ¿Cómo puedo saber más sobre el proyecto antes de donar?
      </Typography>
      <Typography variant="body1" gutterBottom>
        Cada proyecto tiene una página detallada con información sobre el creador, la descripción del proyecto, los objetivos y posiblemente recompensas para los donantes. Además, puedes contactar al creador del proyecto a través de la plataforma para hacer preguntas adicionales.
      </Typography>


      <Typography variant="h5" component="h5" gutterBottom>
        ¿Cuándo recibiré las recompensas prometidas por mi donación?
      </Typography>
      <Typography variant="body1" gutterBottom>
        Por el momento esta plataforma solo es de donaciones.
      </Typography>
    </>
  );
};

export default PreguntasFrecuentes;
