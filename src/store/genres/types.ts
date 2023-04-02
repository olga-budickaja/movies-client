export interface Genres {
    id: number;
    name: string;
    numMovies: number;
}
export interface GenresState {
    genres: Genres[]
}