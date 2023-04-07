<template>
  <div class="main">
      <UIBanner
          :items="genres"
          image-url="./assets/background.jpg"
          buttons
          search
      />
      <USorts :buttons="buttons" @sort-movies="sortMovies" />
      <UMoviesList :movies="sortedAndSearchedMovies" />
      <UPagination :total-pages="totalPages" />
  </div>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';
import UHeader from "@/components/layout/UHeader.vue";
import UMoviesList from "@/components/movies/UMoviesList.vue";
import USorts from "@/components/USorts.vue";
import {Action, Getter} from "vuex-class";
import UPagination from "@/components/UPagination.vue";
import UIBanner from "@/components/UI/UIBanner.vue";

@Component({
  components: {UIBanner, UPagination, USorts, UMoviesList, UHeader},
})
export default class MainPageVuex extends Vue {
  buttons!: { id: number; name: string; icon: string }[];

  limit!: number;
  page!: number;

  totalPages:number = 0

  @Getter('moviesList') moviesList!: any[];
  @Getter('sortedMovies') sortedMovies!: any[];
  @Getter('sortedAndSearchedMovies') sortedAndSearchedMovies!: any[];

  @Action('sortMovies') sortMovies!: (sortBy: string) => void;

  get genres(): any[] {
    const genres = this.$store.state.genres?.genres || [];

    return genres.slice(0, 5).map((genre: any) => genre);
  }

  async created() {
    this.limit = this.$store.state.movies.limit
    this.buttons = this.$store.state.movies.buttons
    this.totalPages = Math.ceil(600 / this.limit)
    await this.$store.dispatch('getMovies');
    await this.sortMovies("release_date");
    await this.$store.dispatch('getGenres')
  }
}
</script>

<style lang="scss" scoped>
.main {
  background: var(--background-color);
  width: 100%;
  height: auto;
}
</style>