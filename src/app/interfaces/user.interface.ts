export interface UserInterface {
    mentorId: number,
    nombre: string,
    correo: string,
    cursos: CourseInterface[]
}

export interface CourseInterface {
    id: number,
    nombre: string,
    completado: number,
    estudiantes: StudentInterface[]
}

export interface StudentInterface {
    id: number,
    nombre: string,
    correo: string,
    cc: string,
    progreso: number,
    notas: NotaInterface[]
}

export interface NotaInterface {
    calificacion: number,
    porcentaje: number
}