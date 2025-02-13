export interface Cursos {
    id: number;
    titulo: string;
    modalidad: 'Presencial' | 'Virtual';
    certificacion: string; 
    duracion:string;    
    descripcion: string;    
    valor: number;
}
