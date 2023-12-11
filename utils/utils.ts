import { ListaDescripciones, ListaMultimedias } from "interfaces/proyect.type";

export const calcularDiasFaltantes = (fechaLimiteStr: string): number => {
    const partes = fechaLimiteStr.split(' ');

    if (partes.length !== 2) {
        throw new Error('El formato de fecha debe ser "año-mes-dia hora:minuto:segundo"');
    }

    // Obtener la parte de la fecha
    const fechaPartes = partes[0].split('-');

    if (fechaPartes.length !== 3) {
        throw new Error('El formato de fecha debe ser "año-mes-dia"');
    }

    // Convertir las partes a números
    const año = parseInt(fechaPartes[0], 10);
    const mes = parseInt(fechaPartes[1], 10) - 1; // Restamos 1 al mes ya que en JavaScript los meses van de 0 a 11
    const dia = parseInt(fechaPartes[2], 10);

    // Convierte la fecha límite a un objeto de fecha
    const fechaLimite = new Date(año, mes, dia);

    // Obtener la parte de la hora
    const horaPartes = partes[1].split(':');

    if (horaPartes.length !== 3) {
        throw new Error('El formato de hora debe ser "hora:minuto:segundo"');
    }

    // Convertir las partes de la hora a números
    const hora = parseInt(horaPartes[0], 10);
    const minuto = parseInt(horaPartes[1], 10);
    const segundo = parseInt(horaPartes[2], 10);

    // Establecer la hora en la fecha límite
    fechaLimite.setHours(hora, minuto, segundo);

    // Obtiene la fecha actual
    const fechaActual = new Date();

    // Calcula la diferencia en milisegundos
    const milisegundosPorDia = 1000 * 60 * 60 * 24; // Milisegundos en un día
    const diferenciaEnMilisegundos = fechaLimite.getTime() - fechaActual.getTime();

    // Calcula los días faltantes y redondea hacia arriba
    const diasFaltantes = Math.ceil(diferenciaEnMilisegundos / milisegundosPorDia);

    return diasFaltantes;
}


export const truncateString = (str: string) => {
    if (str.length > 90) {
        return str.slice(0, 80) + "...";
    } else {
        return str;
    }
}




export const buscarMultimediaPorTipo = (multimedias: ListaMultimedias[], tipoBuscado: number): string => {
    const multimediaEncontrada = multimedias.find(multimedia => multimedia.tipo === tipoBuscado);
    return multimediaEncontrada ? multimediaEncontrada.url : "undefined";
};

export const buscarDescipcionPorTipo = (descripciones: ListaDescripciones[], tipoBuscado: number): string => {
    const descripcionEncontrada = descripciones.find(descripcion => descripcion.tipo === tipoBuscado);
    return descripcionEncontrada ? descripcionEncontrada.descripcion : "undefined";
};


export const esFechaExpirada = (fechaFinalizacion: string):boolean => {
    const fechaActual = new Date();

    const fechaFinalizacionObj = new Date(fechaFinalizacion);

    if (fechaActual > fechaFinalizacionObj) {
        return false
    } else {
        return true

    }
}



export const obtenerFechaActualFormateada = () => {
    const fechaActual = new Date();
    const año = fechaActual.getFullYear();
    const mes = String(fechaActual.getMonth() + 1).padStart(2, '0');
    const dia = String(fechaActual.getDate()).padStart(2, '0');
    const horas = String(fechaActual.getHours()).padStart(2, '0');
    const minutos = String(fechaActual.getMinutes()).padStart(2, '0');
    const segundos = String(fechaActual.getSeconds()).padStart(2, '0');
  
    // const fechaFormateada = `${año}-${mes}-${dia} ${horas}:${minutos}:${segundos}`;
    const fechaFormateada = `${año}-${mes}-${dia}`;
    return fechaFormateada;
  };
