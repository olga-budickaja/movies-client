import {GetterTree} from "vuex";
import {RootState} from "@/store/types";
import {GenresState} from "@/store/genres/types";

export const getters: GetterTree<GenresState, RootState> = {
    genresInfo(state) {
        return state.genres
    }
}