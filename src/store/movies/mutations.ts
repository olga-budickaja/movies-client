import {MutationTree} from "vuex";
import {MoviesState} from "@/store/movies/types";
import Movie from "@/types/MoviesType";

export enum MoviesMutations {
    SET_MOVIES = "SET_MOVIES",
    SET_FIELD = "SET_FIELD",
    SET_SORTED_MOVIES = "SET_SORTED_MOVIES",
    SET_SORTED_AND_SEARCHED_MOVIES = "SET_SORTED_AND_SEARCHED_MOVIES",
    SET_SEARCH_QUERY = "SET_SEARCH_QUERY",
    SET_PAGE = "SET_PAGE"
}

export const mutations: MutationTree<MoviesState> = {
    [MoviesMutations.SET_MOVIES](state, movies: Movie[]) {
        state.movies = movies;
    },
    [MoviesMutations.SET_FIELD](state, field) {
        state.field = field;
    },
    [MoviesMutations.SET_SORTED_MOVIES](state, sortedMovies: Movie[] | []) {
        state.sortedMovies = sortedMovies;
    },
    [MoviesMutations.SET_SORTED_AND_SEARCHED_MOVIES](state, sortedAndSearchedMovies: Movie[] | []) {
        state.sortedMovies = sortedAndSearchedMovies;
    },
    [MoviesMutations.SET_SEARCH_QUERY](state, searchQuery: string) {
        state.searchQuery = searchQuery;
    },
    [MoviesMutations.SET_PAGE](state, page: number) {
        state.page = page;
    }
}