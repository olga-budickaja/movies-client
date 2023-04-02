import {Module} from "vuex";
import {RootState} from "@/store/types";
import {mutations} from "@/store/genres/mutations";
import {getters} from "@/store/genres/getters";
import {actions} from "@/store/genres/actions";
import {GenresState} from "@/store/genres/types";

export const genres: Module<GenresState, RootState> = {
    state: {
        genres: [],
    },
    mutations,
    getters,
    actions
}