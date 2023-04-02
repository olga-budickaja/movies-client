import {Module} from "vuex";
import {RootState} from "@/store/types";
import {MoviesState} from "@/store/movies/types";
import {getters} from "@/store/movies/getters";
import {mutations} from "@/store/movies/mutations";
import {actions} from "@/store/movies/actions";


export const movies: Module<MoviesState, RootState> = {
    state: {
        movies: [],
        sortedMovies: [],
        field: 'release_date',
        buttons: [
            {id: 1, name: 'popularity', icon: 'arrows-up-down'},
            {id: 2, name: 'budget', icon: 'arrow-down-wide-short'},
            {id: 3, name: 'release_date', icon: 'arrow-down-wide-short'},
        ],
        searchQuery: '',
        page: 1,
        limit: 30,
    },
    getters,
    mutations,
    actions,
    namespaced: false
}