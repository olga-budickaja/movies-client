import {ActionTree} from "vuex";
import {MoviesState} from "@/store/movies/types";
import {RootState} from "@/store/types";
import {MoviesMutations} from "@/store/movies/mutations";
import {publicRequest} from "@/requestMethod";

export const actions: ActionTree<MoviesState, RootState> = {
    async getMovies({ commit, state, dispatch }) {
        try {
            const res = await publicRequest.get(`movies`, {
                params: {
                    page: state.page,
                    limit: state.limit
                }
            })

            commit(MoviesMutations.SET_MOVIES, res.data);

            await dispatch('fetchPoster').then(() => {
                commit(MoviesMutations.SET_MOVIES, res.data);
                // фильтр для удаления объектов без изображений
                state.movies = state.movies.filter((item) => item.poster_path !== 'https://placehold.it/300x450?text=No+Image');
            });
        } catch (e) {
            console.log(e);
        } finally {

        }
    },
    async getMoviesForGenre({ state, commit, dispatch }, genreName: string) {
        try {
            const res = await publicRequest.get(`movies/${genreName}`)
            commit(MoviesMutations.SET_MOVIES, res.data);

            await dispatch('fetchPoster').then(() => {
                commit(MoviesMutations.SET_MOVIES, res.data);
                // фильтр для удаления объектов без изображений
                state.movies = state.movies.filter((item) => item.poster_path !== 'https://placehold.it/300x450?text=No+Image');
            });
        } catch (e) {
            console.log(e)
        }
    },
    async fetchPoster({ state }): Promise<void> {
        const promises = state.movies.map(async (movie) => {
            if (movie.poster_path && movie.poster_path !== 'null') {
                try {
                    const response = await fetch(`https://image.tmdb.org/t/p/w300/${movie.poster_path}`);
                    if (response.status === 200) {
                        movie.poster_path = `https://image.tmdb.org/t/p/w300/${movie.poster_path}`;
                    } else {
                        movie.poster_path = 'https://placehold.it/300x450?text=No+Image';
                    }
                } catch (e) {
                    console.log(`Error fetching poster for movie ${movie.id}: ${e}`);
                }
            }
        });

        await Promise.all(promises);
    },
    sortMovies({ commit, getters }, field: string) {
        let sortedMovies;
        const isAscending = getters.sortedMovies.length > 0 ? getters.sortedMovies[0][field] < getters.sortedMovies[getters.sortedMovies.length - 1][field] : true;
        sortedMovies = [...getters.moviesList].sort((a: any, b: any) => {
            const comparison = a[field] < b[field] ? 1 : a[field] > b[field] ? -1 : 0;
            return isAscending ? comparison : -comparison;
        });
        commit(MoviesMutations.SET_SORTED_MOVIES, sortedMovies);
    },
    // sortedAndSearchedMovies: ({state, getters}) => {
    //     return getters.sortedMovies.filter((movie: any)=> movie.title.includes(state.searchQuery))
    // },
}