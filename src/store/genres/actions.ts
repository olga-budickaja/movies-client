import {ActionTree} from "vuex";
import {RootState} from "@/store/types";
import {publicRequest} from "@/requestMethod";
import {GenresMutations} from "@/store/genres/mutations";
import {GenresState} from "@/store/genres/types";

export const actions: ActionTree<GenresState, RootState> = {
    async getGenres({ commit }) {
        try {
            const res = await publicRequest.get('genres');
            commit(GenresMutations.SET_GENRES, res.data)
        } catch (e) {
            console.log(e)
        }
    }
}