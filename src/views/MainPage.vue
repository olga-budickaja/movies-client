<template>
  <div>
    <USorts />
    <UMoviesList :movies="movies" />
  </div>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';
import UHeader from "@/components/layout/UHeader.vue";
import {connect, driver} from "../../vue-neo4j.config";
import { Record } from 'neo4j-driver';
import UMoviesList from "@/components/movies/UMoviesList.vue";
import USorts from "@/components/USorts.vue";
interface neo4Plugin extends Vue {
  $neo4j: {
    connect: Function;
    getDriver: Function;
    getSession: Function;
  };
  testQuery(): Promise<void>;
  getMovies(): Promise<void>;
}

interface Movie {
  id: string;
  original_title: string;
  poster_path: string;
  release_date: string;
  runtime: string;
  title: string;
  budget: string;
  overview: string;
  tagline: string;
  popularity: string;
  maxPopularity: string
  genres: object;
}

@Component({
  components: {USorts, UMoviesList, UHeader}
})
export default class MainPage extends Vue implements neo4Plugin {
  movies: Movie[] = [];

  $neo4j!: {
    connect: Function;
    getDriver: Function;
    getSession: Function;
    run: Function;
  };

  created(this: neo4Plugin) {
    connect.call(this);
    driver.call(this);
  }

  mounted() {
    this.testQuery();
    this.getMovies();
  }

  async testQuery() {
    // Get a session from the driver
    const session = this.$neo4j.getSession()

    try {
      // Or you can just call this.$neo4j.run(cypher, params)
      const res = await session.run('MATCH (n) RETURN count(n) AS count')

      console.log(res.records[0].get('count'))
    } finally {
      session.close()
    }
  }

  async getMovies() {
    const session = this.$neo4j.getSession();
    const query = `
      MATCH (m:Movie)-[:IN_GENRE]->(g:Genre)
      RETURN m.id, m.original_title, m.poster_path, m.release_date,
      m.runtime, m.title, m.budget, m.overview, m.tagline,
      m.popularity, max(m.popularity) AS max_popularity, COLLECT(g.name) as genres
      ORDER BY m.release_date DESC
      SKIP 0
      LIMIT 30
    `;
    try {
      const res = await session.run(query);
      res.records.forEach((record: Record) => {
        const movie = {
          id: record.get('m.id'),
          original_title: record.get('m.original_title'),
          poster_path: record.get('m.poster_path'),
          release_date: record.get('m.release_date'),
          runtime: record.get('m.runtime'),
          title: record.get('m.title'),
          budget: record.get('m.budget'),
          overview: record.get('m.overview'),
          tagline: record.get('m.tagline'),
          popularity: record.get('m.popularity'),
          maxPopularity: record.get('max_popularity'),
          genres: record.get('genres')
        };

        async function fetchPoster(movie: any): Promise<void> {
          if (movie.poster_path && movie.poster_path !== 'null') {
            const response = await fetch(`https://image.tmdb.org/t/p/w300/${movie.poster_path}`);
            if (response.status === 200) {
              movie.poster_path = `https://image.tmdb.org/t/p/w300/${movie.poster_path}`;
            } else {
              movie.poster_path = 'https://placehold.it/300x450?text=No+Image';
            }
          }
        }

        this.movies.push(movie);

        fetchPoster(movie).then(() => {
          this.movies.push(movie);
          // фильтр для удаления объектов без изображений
          this.movies = this.movies.filter((item) => item.poster_path !== 'https://placehold.it/300x450?text=No+Image');
        });

      });
    } catch (e) {
      console.log(e);
    } finally {
      session.close();
    }
  }

}
</script>

<style scoped>

</style>