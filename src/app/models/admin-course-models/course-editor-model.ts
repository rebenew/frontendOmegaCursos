export interface Course {
   course: string;
   content: Unit[];
  }
  
  export interface Unit {
   unidad: number; 
   contenido: Resource[];
  }
  
  export interface Resource {
    ResourceName: string;
    Link: string;
    Embed: string;
  }