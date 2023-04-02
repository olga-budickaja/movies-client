<template>
  <div v-if="movie.poster_path !== null && movie.genres" class="movie">
    <img
        :src="`https://image.tmdb.org/t/p/w300/${movie.poster_path}`"
        :alt="movie.title"
        class="movie__img"
    >
    <div v-if="movie.popularity" class="movie__popularity">
      <font-awesome-icon icon="fa-solid fa-star" class="movie__icon-pop" />
    <div class="movie__popularity-icon">
      {{ Math.ceil(movie.popularity) }}
    </div>
    </div>
    <div class="movie__desc">
      <div v-if="movie.runtime !== 0" class="movie__time">
        <font-awesome-icon icon="fa-solid fa-clock" class="movie__icon" />
        {{ movie.runtime }} {{ $t('movies.min') }}
      </div>
      <div class="movie__red">•</div>
      <div v-if="movie.release_date" class="movie__genre movie__red">{{ movie.genres[0] }} ({{ movie.release_date.year.low }})</div>
    </div>
    <div :class="['movie__hover', {show: isHover}]">
      <h2 class="title title_fz18">{{ $t('movies.original_title') }}:</h2>
      <p class="title title_fz16">{{ movie.original_title }}</p>
      {{ movie.overview }}
    </div>
  </div>
</template>

<script lang="ts">
import {Component, Prop, Vue} from 'vue-property-decorator';

@Component({

})
export default class UMovie extends Vue {
  @Prop() movie!: any;
  @Prop() type?: string;
  isHover = false

}
</script>

<style lang="scss" scoped>
.movie {
  position: relative;
  border-radius: 8px;
  cursor: pointer;
  &__img {
    width: 300px;
    height: 450px;
    object-fit: cover;
    border-radius: 8px;
  }
  &__popularity {
    position: absolute;
    display: flex;
    align-items: center;
    font-weight: 800;
    gap: 8px;
    padding: 8px 20px;
    background: var(--color-yellow);
    border-radius: 40px;
    top: 14px;
    right: 14px;
    text-shadow: 1px 1px 2px var(--background-color);
    &-icon {
      font-weight: 800;
      opacity: 0.7;
    }
  }
  &__desc {
    position: absolute;
    bottom: 0;
    width: 100%;
    height: 40px;
    padding: 0 20px;
    display: flex;
    align-items: center;
    border-bottom-left-radius: 7px;
    border-bottom-right-radius: 7px;
    justify-content: space-between;
    background: var(--background-color1);
    * {
      font-weight: 600;
    }
  }
  &__time {
    color: var(--color-orange);
    display: flex;
    gap: 8px;
    align-items: center;
  }
  &__icon {
    font-size: 12px;
    &-pop {
      opacity: 0.6;
    }
    * {
      fill: var(--color-orange) !important;
    }
  }
  &__red {
    color: var(--color-red);
  }
  &__hover {
    position: absolute;
    bottom: -40px;
    opacity: 0;
    padding: 20px;
    width: 100%;
    background: var(--background-color1);
    transition: bottom 0.7s;
  }
}
.movie:hover .movie__hover {
  opacity: 1;
  bottom: 40px;
  pointer-events: auto;
}
.show {
  display: block !important;
}
@media only screen and (max-width: 320px) {
  .movie {
    &__img {
      width: 250px;
    }
  }
}
</style>