<template>
  <div id="app">
    <div class="container">
      <UHeader @open="toggleMenu"/>
      <USidebar :open-sidebar="isOpenMenu" />
      <div :class="['content', {content_full: !isOpenMenu}]">
        <router-view />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import UHeader from '@/components/layout/UHeader.vue';
import USidebar from "@/components/layout/USidebar.vue";
import {currentTheme} from "@/utils/change-theme";

@Component({
  components: {USidebar, UHeader}
})
export default class App extends Vue {
  isOpenMenu = false;

  private created() {
    currentTheme()
  }

  toggleMenu(): void {
    this.isOpenMenu = !this.isOpenMenu;
  }

}
</script>

<style lang="scss" scoped>
.content {
  margin-left: 250px !important;
  transition: 0.5s;
  &_full {
    margin-left: 0 !important;
  }
}
@media only screen and (max-width: 635px) {
  .content {
    margin-left: 0 !important;
  }
}
</style>

