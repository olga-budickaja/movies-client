<template>
  <div
      class="promo"
      :style="bgStyle"
  >
    <div class="promo__genres">
      <UIButton
          v-for="genre in genres"
          :key="genre.name"
          :label="genre.name"
          color="accent2"
          rounded="rounded"
          @click="$router.push(`/genres/${genre.name}`)"
      />
    </div>
    <div class="promo__search">
      <USearch
          :model-value="searchQuery"
          @input="setSearchQuery($event)"
          type="banner"
      />
    </div>
  </div>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';
import UIButton from "@/components/UI/UIButton.vue";
import USearch from "@/components/USearch.vue";
import {Getter, Mutation} from "vuex-class";

@Component({
  components: {USearch, UIButton}
})
export default class USlider extends Vue {

  @Getter('moviesList') moviesList!: any[];
  @Getter('searchQuery') searchQuery!: '';

  @Mutation('SET_SEARCH_QUERY') setSearchQuery!: (searchQuery: string) => void;
  get bgStyle() {
    return {
      backgroundImage: `url(${require('@/assets/background.jpg')})`
    };
  }

  get genres(): any[] {
    const genres = this.$store.state.genres?.genres || [];

    return genres.slice(0, 5).map((genre: any) => genre);
  }

  async created() {
    await this.$store.dispatch('getGenres')
    this.searchQuery = this.$store.state.movies.searchQuery;
  }

}
</script>

<style lang="scss" scoped>
.promo {
  position: relative;
  width: 100%;
  height: 380px;
  background-size: cover;
  background-position: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: 12px;
  &__genres {
    position: absolute;
    top: 40px;
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    gap: 20px;
    opacity: 0.8;
  }
  &__search {
    width: 40%;
  }
}
</style>