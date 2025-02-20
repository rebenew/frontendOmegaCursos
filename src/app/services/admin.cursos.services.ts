import { Injectable } from '@angular/core';

export interface Curso {
  id: number;
  titulo: string;
  modalidad: 'Presencial' | 'Virtual';
  certificacion: string;
  duracion: string;
  descripcion: string;
  valor: number;
}

@Injectable({
  providedIn: 'root'
})
export class CursoService {
  private cursos: Curso[] = [
    { id: 1, 
      titulo: 'PROCESAMIENTO DE DATOS ', 
      modalidad: 'Virtual',
      certificacion: 'Certificacion virtual',
      duracion: ' 3 Meses / 12 Semanas - 72 horas sincrónicas de mentorías con expertos en la industria / Contenido de apoyo en plataforma, diseñado con metodología Edublocks / Reto real, propuesto por empresa aliada   ',
      descripcion: ' ¡Fortalece tu potencial con nuestro curso de Procesamiento de Datos! Descubre las habilidades fundamentales que necesitas para conocer el mundo del procesamiento de datos. Los módulos especializados que conforman el curso son: Programación con Python; Estadística básica con Python; Bases de datos relacionales; y Limpieza y transformación de datos en Python. ¡No te pierdas esta oportunidad de adquirir conocimientos esenciales y aplicables en el mercado laboral actual! Con recursos de calidad, te acompañaremos en cada paso del camino. ¡Prepárate para acceder al mundo de posibilidades en el procesamiento de datos!', 
      valor: 2700000 },
      { id: 2,
        titulo: 'BACKEND ', 
        modalidad: 'Virtual',
        certificacion: 'Certificacion virtual',
        duracion:  '3 Meses / 12 Semanas - 72 horas sincrónicas de mentorías con expertos en la industria / Contenido de apoyo en plataforma, diseñado con metodología Edublocks / Reto real, propuesto por empresa aliada / 72 horas de inglés para tecnología',
        descripcion: 'Aquí podrás crear los servicios y las funciones que procesan los datos del usuario y que retornan una respuesta. Aprenderás cómo se cumple este proceso y qué existe luego de que alguien teclea “Enviar”. En el módulo de Backend adquirirás habilidades en programación orientada a objetos con Java, manejo de APIs, utilización del framework Spring Boot, y bases de datos SQL y NoSQL, todo enriquecido con aplicaciones prácticas y trabajo colaborativo que te ayudará a desarrollar soft skills. Recomendamos una dedicación mínima de 26 horas a la semana, para completar: el contenido en plataforma diseñado con metodología Edublocks. 72 horas de mentorías con expertos en la industria. 72 horas de inglés para tecnología, con encuentros sincrónicos y actividades en plataforma. Potencia tus habilidades con Nodo EAFIT, contáctanos para conocer más sobre la ruta de formación en Desarrollo Web.',
        valor: 2.700000 },
        { id: 3,
          titulo: ' IA PARA TODOS', 
          modalidad: 'Virtual',
          certificacion: 'Certificacion virtual',
          duracion: '10 HORAS',
          descripcion:  '¡Descubre cómo la IA está revolucionando el mundo! Conoce los conceptos clave de la IA, cómo surgió, cómo está impactando las industrias a nivel mundial, las posibilidades que nos brinda, cómo utilizarla y cómo esta tecnología está cambiando el futuro.',
          valor: 473.000  
      }
  ];

  constructor() {}

  getCursos(): Curso[] {
    return this.cursos;
  }

  getCurso(id: number): Curso | undefined {
    return this.cursos.find(curso => curso.id === id);
  }

  agregarCurso(curso: Curso) {
    curso.id = this.cursos.length + 1;
    this.cursos.push(curso);
  }

  eliminarCurso(id: number) {
    const confirmacion = window.confirm('¿Estás seguro de que deseas eliminar este curso?');
    if (confirmacion) {
      this.cursos = this.cursos.filter(curso => curso.id !== id);
    }
  }
}
