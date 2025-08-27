import { StatusType } from '../enumerations';
import { ICategory } from './category';
import { ICountry } from './country';
import { IServer } from './movie';
import { IMovieGenre } from './movie_genre';
import { ISounder } from './sounder';
import { IYear } from './year';

export interface IBook {
  id: string;
  status: boolean;
  state: number;
  name: string;
  descr: string;
  images: string[];
  frame_images: string[];
  min_age: number;
  price: number;
  status_type: StatusType;
  country_id: string;
  year_id: string;
  file_id: string;
  created_at: string;
  updated_at: string;
  sounder: ISounder[];
  category: ICategory[];
  movie_genre: IMovieGenre[];
  country: ICountry;
  year: IYear;
  book_file: IFile;
  commit: any[];
  likedislike: any[];
}

export interface IFile {
  id: string;
  folder_name: string;
  used: boolean;
  is_transferred: boolean;
  server_id: string;
  file_name: string;
  file_size: number;
  created_at: string;
  updated_at: string;
  server: IServer;
}
