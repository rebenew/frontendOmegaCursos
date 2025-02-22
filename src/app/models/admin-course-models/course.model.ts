export interface Courses {
    id: number;
    title: string;
    modality: 'Presencial' | 'Virtual';
    certification: string; 
    duration:string;    
    description: string;    
    price: number;
}
