import { Crew } from './crew';
import { Cast } from './cast';

export class Movie {
    id!: number;
    original_title!: string;
    release_date!: string;
    overview!: string;
    vote_average!: number;
    vote_count!: number;
    popularity!: number;
    poster_path!: string;
    crew_list!: Array<Crew>;
    cast_list!: Array<Cast>;
}