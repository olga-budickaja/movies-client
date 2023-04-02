<template>
  <div class="genres">
    <UIList type="column" type-menu="vertical" :items="links" :sub-items="genresLink" />
  </div>

</template>

<script lang="ts">
import {Component, Prop, Vue} from 'vue-property-decorator';
import UIList from "@/components/UI/UIList.vue";

@Component({
  components: {UIList}
})
export default class USidebarMenu extends Vue {

  links = [
    {name: 'home', link: '/'},
    {name: 'store', link: '/store'},
    {name: 'categories', link: '/categories', sub: 'sub'},
  ];

  genreLinks: any = []

  get genres(): any[] {
    const genres = this.$store.state.genres?.genres || [];

    return genres.map((genre: any) => genre)
  }

  get genresLink() {
    let genre;
    for (let i = 0; i < this.genres.length; i++) {
      genre = {
        name: this.genres[i].name,
        link: `/genres/${(this.genres[i].name).replaceAll(' ', '-')}`,
        count: this.genres[i].numMovies.low
      }
      this.genreLinks = [...this.genreLinks, genre]
    }
    return this.genreLinks
  }

  async mounted() {
    await this.$store.dispatch('getGenres')
  }

}
</script>

<style lang="scss" scoped>
.genres {
  max-height: calc(100vh - 345px);
}
</style>