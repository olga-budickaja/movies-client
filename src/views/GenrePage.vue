<template>
  <div>
    <UIBanner image-url="../../assets/background-genres.jpg" :title="genreName"/>
    <UMoviesList type="genre" :movies="moviesList" />
  </div>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';
import UMoviesList from "@/components/movies/UMoviesList.vue";
import UIBanner from "@/components/UI/UIBanner.vue";

@Component({
  components: {UIBanner, UMoviesList}
})
export default class GenrePage extends Vue {
  genreName: string = this.$route.params.genreName
  get moviesList(): any[] {
    const movies = this.$store.state.movies?.movies || [];

    return movies.map((movie: any) => movie);
  }

  async mounted() {
    this.$watch('$route', this.onRouteChange);
    await this.$store.dispatch('getMoviesForGenre', this.genreName)
  }

  async getMoviesForGenre() {
    try {
      const res = await this.$store.dispatch('getMoviesForGenre', this.genreName);
      this.$store.commit('setMovies', res.data);
      // фильтр для удаления объектов без изображений
      this.$store.state.movies.movies = this.$store.state.movies.movies.filter(
          (item: any) => item.poster_path !== 'https://placehold.it/300x450?text=No+Image'
      );
    } catch (e) {
      console.log(e);
    }
  }

  onRouteChange() {
    this.genreName = this.$route.params.genreName;
    this.getMoviesForGenre();
  }
}
</script>

<style scoped>

</style>