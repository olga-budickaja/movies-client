import gql from "graphql-tag";
import 'vue-apollo'

export interface Movie {
    id: number;
    original_title?: string;
    poster_path?: string;
    release_date?: object;
    runtime?: number;
    title?: string;
    budget?: number;
    overview?: string;
    tagline?: string;
    popularity?: number;
    genres?: string[];
}

export interface QueryResponse {
    movies: Movie[];
}

export interface QueryVariables {
    limit: number;
    page: number;
}

const GET_MOVIES = gql`
    query {
        movies  {
            id
            original_title
            poster_path
            release_date
            runtime
            title
            budget
            overview
            tagline
            popularity
            #            genres {
            #                name
            #            }
        }
    }
`

export default GET_MOVIES;