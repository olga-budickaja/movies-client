<template>
  <div
      class="register"
      :style="bgStyle"
  >

  </div>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';

@Component
export default class LoginPage extends Vue {
  get bgStyle() {
    return {
      backgroundImage: `url(${require('@/assets/bg-login.jpg')})`
    };
  }
}
</script>

<style lang="scss" scoped>
.register {
  display: flex;
  width: 100%;
  height: 100vh;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
</style>