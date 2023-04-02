<template>
  <div class="movie-list">
      <UMovie
          v-for="(movie, idx) in movies"
          :key="idx"
          :movie="movie"
      />
    </div>
</template>

<script lang="ts">
import {Component, Prop, Vue} from 'vue-property-decorator';
import UMovie from "@/components/movies/UMovie.vue";

@Component({
  components: {UMovie}
})
export default class UMoviesList extends Vue {
  @Prop() movies!: any[];
  @Prop() type?: string;
}
</script>

<style lang="scss" scoped>
.movie-list {
  display: flex;
  flex-wrap: wrap;
  gap: 25px;
  justify-content: center;
  margin-top: 20px;
}
</style>