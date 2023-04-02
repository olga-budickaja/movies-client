import {GetterTree} from "vuex";
import {MoviesState} from "@/store/movies/types";
import {RootState} from "@/store/types";


export const getters: GetterTree<MoviesState, RootState> = {
    moviesList(state): any[] {
        return state.movies.map((movie: any) => movie);
    },
    sortedMovies(state): any[] {
        return state.sortedMovies;
    },
    searchQuery(state): string {
        return state.searchQuery;
    },
    sortedAndSearchedMovies(state, getters): any[] {
        return getters.sortedMovies.filter((movie: any)=> movie.title.toLowerCase().includes(state.searchQuery))
    },
    page(state): number {
        return state.page;
    }
}