<template>
  <div>
    <ul>
      <li v-for="movie in movies" :key="movie.id">
        {{ movie.title }}
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import GET_MOVIES, {Movie, QueryVariables} from '@/queries';
import { ApolloQueryResult } from 'apollo-client';

@Component({
  apollo: {
    movies: {
      query: GET_MOVIES,
      variables: {
        limit: 10,
        page: 1
      } as QueryVariables,
      fetchPolicy: 'network-only'
    }
  },

})
export default class Movies extends Vue {
  movies!: ApolloQueryResult<{ movies: Movie[] }>;
  limit = 10;
  page = 1;
  showMoreEnabled:boolean = true


  get loading() {
    return (this.$apollo.queries.movies.loading);
  }

}
</script>

<style scoped>

</style>