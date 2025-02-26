export interface Course {
    id: number;
    title: string;
    modules: Module[];
    
  }
  
  export interface Module {
    id: number;
    title: string;
    topics: Topic[];
    isEditing?: boolean;
  }
  
  export interface Topic {
    id: number;
    title: string;
    subtopics: Subtopic[];
  }
  
  export interface Subtopic {
    id: number;
    title: string;
    files: FileData[];
  }
  
  export interface FileData {
    id: number;
    name: string;
    type: string; 
    url: string;
  }