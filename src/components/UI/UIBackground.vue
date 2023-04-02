<template>
  <div
      class="background"
      :style="bgStyle"
  >
    <h1 class="background__title title">
      <slot/>
    </h1>
  </div>
</template>

<script lang="ts">
import {Component, Prop, Ref, Vue} from 'vue-property-decorator';

@Component
export default class UIBackground extends Vue {
  @Prop() url!: string;
  @Ref('backgroundRef') backgroundRef!: HTMLElement;
  @Ref('imageRef') imageRef!: HTMLImageElement;

  get bgStyle() {
    return {
      backgroundImage: `url(${require('@/assets/background-genres.jpg')})`
    }
  }
}
</script>

<style lang="scss" scoped>
.background {
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
  &__title {
    font-weight: 900;
    font-size: 12vmin;
    color: var(--color-purple);
    animation: rotateHue 10s alternate infinite;
  }
}
@keyframes rotateHue {
  to {
    filter: hue-rotate(1turn);
  }
}
@media only screen and (max-width: 540px) {
  .background {
    height: 200px;
  }
}
</style>