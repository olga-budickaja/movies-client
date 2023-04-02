import {MutationTree} from "vuex";
import {Genres, GenresState} from "@/store/genres/types";

export enum GenresMutations {
    SET_GENRES = "SET_GENRES"
}
export const mutations: MutationTree<GenresState> = {
    [GenresMutations.SET_GENRES](state, genres: Genres[]) {
        state.genres = genres
    }
}