import Vue from 'vue'
import Vuex, {StoreOptions} from 'vuex'
import {RootState} from "@/store/types";
import {movies} from "@/store/movies";
import VueNeo4j from 'vue-neo4j'
import {genres} from "@/store/genres";

Vue.use(VueNeo4j)
Vue.use(Vuex)

const store: StoreOptions<RootState> = {
  state: {
  },
  getters: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    movies,
    genres
  },
}

export default new Vuex.Store<RootState>(store);
