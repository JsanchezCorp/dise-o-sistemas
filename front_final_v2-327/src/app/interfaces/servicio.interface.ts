export interface Servicio {
    id: number;
    nombre: string;
    descripcion: string;
    precio: number;
    categoriaServicio: {
        id: number;
        nombre: string;
        descripcion: string;
        activo: boolean;
    };
    activo: boolean;
} 