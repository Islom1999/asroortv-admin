import { MovieType, Quality, StatusType } from "../enumerations";
import { ICategory } from "./category";
import { ICountry } from "./country";
import { IMovieGenre } from "./movie_genre";
import { ISounder } from "./sounder";
import { IYear } from "./year";

export interface IMovie {
    id?: string;
    video: string;
    treyler: string;
    name: string;
    descr: string;
    images: string[];
    frame_images: string[];
    movie_type: MovieType;
    quality: Quality;
    min_age: number;
    duration: number;
    language: string;
    status_type: StatusType;
    is_slider: boolean;

    country_id: string;
    year_id: string;
    movie_id?: string;

    country: ICountry;
    year: IYear;

    sounderId?: string;
    categoryId?: string;
    movieGenreId?: string;

    sounder?: ISounder[];
    category?: ICategory[];
    movie_genre?: IMovieGenre[];

    parent_movie?: IMovie
    childen_movie?: IMovie[]

    video_id: string;
    format: number[];
    video_type: string;

    video_file?: IVideo;
}

export interface IVideo {
    id: string
    folder_name: string
    used: boolean
    is_transferred: boolean
    server_id: string
    file_name: string
    default_format: string
    file_size: number
    is_format: boolean
    is_stream_ready: boolean
    properties: any
    format: number[]
    created_at: string
    updated_at: string
    server: IServer
}

export interface IServer {
    id: string
    ip_address: string
    username: string
    domain: string
    name: string
    description: string
    is_active: boolean
    created_at: string
    updated_at: string
}
