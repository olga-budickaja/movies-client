<template>
  <div>

  </div>
</template>

<script lang="ts">
import gql from 'graphql-tag';
import {Component, Vue} from 'vue-property-decorator';


@Component
export default class GraphMoviesPage extends Vue {

  page:number = 1

  private limit:number = 30
  private pageNumber:number = this.page
  private offset:number = Math.max(0, ( this.pageNumber -1) * this.limit);


  async getMovies(): Promise<void> {
    try {
      const result = await this.$apollo.query({
        query: gql`
          query {
              movies(where: {
                NOT: { poster_path: null }
              }
              options: {
                  offset: ${this.offset},
                  limit: 30,
                  sort: [
                    {
                      release_date: DESC
                    }
                  ]
              }
              ) {
                  id
                  title
                  release_date
                  poster_path
                  id
                  original_title
                  poster_path
                  release_date
                  runtime
                  title
                  budget
                  overview
                  tagline
                  popularity
                  genres {
                    name
                  }
              }
          }
      `,
      })

      console.log(result)

    } catch (e) {
      console.log(e)
    }
  }

  async mounted() {
    await this.getMovies()
  }
}
</script>

<style scoped>

</style>