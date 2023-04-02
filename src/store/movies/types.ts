export interface Movies {
    id: string;
    original_title: string;
    poster_path: string;
    release_date: string;
    runtime: string;
    title: string;
    budget: string;
    overview: string;
    tagline: string;
    popularity: string;
    maxPopularity: string;
    genres: object;
}

export interface MoviesState {
    movies: Movies[];
    sortedMovies: Movies[] | [];
    field: string;
    buttons: any[];
    searchQuery: string;
    page: number;
    limit: number;
}