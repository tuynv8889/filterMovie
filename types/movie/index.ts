export interface IMovie {
  name: string;
  rating: number;
  genres: string[];
  showings: string[];
  [name: string]: any;
}

export const TimeFormat = "HH:mm:ss";
