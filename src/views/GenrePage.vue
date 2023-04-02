<template>
  <div>
    <UIBackground url="@/assets/background.jpg">{{ genreName }}</UIBackground>
    <UMoviesList type="genre" :movies="moviesList" />
  </div>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';
import UMoviesList from "@/components/movies/UMoviesList.vue";
import UIBackground from "@/components/UI/UIBackground.vue";

@Component({
  components: {UIBackground, UMoviesList}
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