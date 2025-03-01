export interface CourseContent {
  id: string;
  name: string;
  title: string;
  isVisible: boolean;
  content: Content[];
}
export interface Content {
  type: string;
  label: string;
  value: string;
}
