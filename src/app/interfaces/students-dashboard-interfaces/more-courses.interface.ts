export interface CoursesResponse {
  courses: Courses[];
}

export interface Courses {
  id: string;
  name: string;
  modality: string;
  price: string;
  duration: string;
  type_of_course: string;
  description: string;
  img: string;
  bg: string;
  what_does_it_include: WhatDoesItInclude[];
  level_required?: string;
}

export enum WhatDoesItInclude {
  AccessToTheCommunity = 'Access to the community',
  AccessToTheForum = 'Access to the forum',
  AccessToThePlatform = 'Access to the platform',
  AccessToTheSupportTeam = 'Access to the support team',
  Certificate = 'Certificate',
}
