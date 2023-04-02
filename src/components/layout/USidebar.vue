<template>
  <div :class="['sidebar', {sidebar_isOpen: openSidebar}]">
    <div class="sidebar__top">
      <ULang />
      <UTheme @toggle="toggleTheme"/>
    </div>
    <USearch
        :model-value="searchQuery"
        @input="setSearchQuery($event)"
    />
    <USidebarMenu  />
    <div class="hr"></div>
    <div class="center"><ULogin /></div>
  </div>
</template>

<script lang="ts">
import {Component, Prop, Vue} from 'vue-property-decorator';
import ULang from "@/components/ULang.vue";
import UTheme from "@/components/UTheme.vue";
import USearch from "@/components/USearch.vue";
import USidebarMenu from "@/components/USidebarMenu.vue";
import ULogin from "@/components/ULogin.vue";
import {toggleTheme} from "@/utils/change-theme";
import {Getter, Mutation} from "vuex-class";

@Component({
  methods: {toggleTheme},
  components: {ULogin, USidebarMenu, USearch, UTheme, ULang}
})
export default class USidebar extends Vue {

  @Prop() openSidebar!: boolean | undefined;

  @Getter('moviesList') moviesList!: any[];
  @Getter('searchQuery') searchQuery!: '';

  @Mutation('SET_SEARCH_QUERY') setSearchQuery!: (searchQuery: string) => void;

  async created() {
    this.searchQuery = this.$store.state.movies.searchQuery;
  }

}
</script>

<style lang="scss" scoped>
.sidebar {
  display: flex;
  flex-direction: column;
  gap: 20px;
  left: 0;
  top: 59px;
  height: 100%;
  position: fixed;
  width: 250px;
  padding: 20px;
  transition: 0.5s;
  background: var(--background-color);
  box-shadow: 8px 8px 10px rgba(0, 0, 0, 0.07);
  transform: translateX(-250px);
  z-index: 2;
  &_isOpen {
    transform: translateX(0px);
    pointer-events: auto;
  }
  &__top {
    display: flex;
    justify-content: space-between;
  }
}
</style>