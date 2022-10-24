export interface Course {
  authors: string[];
  creationDate: string;
  description: string;
  duration: number;
  id: string;
  title: string;
}

export const INFO_MESSAGE = {
  title: 'Empty list',
  message: "Please use the 'Add new course' button to add your first course",
  buttonText: 'Add new course',
};

export const COURSES = [
  {
    id: '1',
    title: 'Title_1',
    description: `Lorem, ipsum dolor sit amen consectetur adding elia. Inventors facer, ab consecrator expedite
     magna aperies, amen harem maxima nebo provident facile site pianissimos total sed. Dolorous, eagle. repellent's,
     facile ut.`,
    creationDate: '01/01/2022',
    duration: 100,
    authors: ['Red_24', 'New_ker'],
  },
  {
    id: '2',
    title: 'Title_2',
    description: `Lorem, ipsum dolor sit amen consectetur adding elia. Inventors facer, ab consecrator expedite
     magna aperies, amen harem maxima nebo provident facile site pianissimos total sed. Dolorous, eagle. repellent's,
     facile ut.`,
    creationDate: '02/02/2022',
    duration: 120,
    authors: ['NeverWinter', 'TYlilTU'],
  },
  {
    id: '3',
    title: 'Title_3',
    description: `Lorem, ipsum dolor sit amen consectetur adding elia. Inventors facer, ab consecrator expedite
     magna aperies, amen harem maxima nebo provident facile site pianissimos total sed. Dolorous, eagle. repellent's,
     facile ut.`,
    creationDate: '03/03/2022',
    duration: 121,
    authors: ['Guzno', 'Jack12'],
  },
];
