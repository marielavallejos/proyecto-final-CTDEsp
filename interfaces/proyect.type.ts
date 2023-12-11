export type Proyectos = ProyectoFinal[]

export type ProyectoFinal = {
    categoriasId: Categoria;
    descripciones: ListaDescripciones[];
    fechaFinalizacion: string;
    fechaPublicacion: string;
    id?: number;
    monto: number;
    montoSumatoriaDonaciones?: number;
    multimedias: ListaMultimedias[]
    nombre: string;
    usuariosId?: number;

}

export type ProyectoCategoria ={
    id?: number;
    categoria: string;

}

export type Categoria = {
    id: number;
    descripcion?: string;
    nombre?: string;

}
export type ListaMultimedias = {
    id?: number;
    url: string;
    tipo: number;

}

export type ListaDescripciones = {
    id?: number;
    tipo: number;
    descripcion: string;
}