<template>
  <div class="promo" :style="{ height: promoHeight + 'px' }">
    <div
        class="promo__parallax"
        :style="{
          backgroundImage: `url(${imageUrl})`,
          backgroundPositionY: `${offsetY}px`,
          height: `${imageHeight}px`,
        }"
        ref="parallax"
    >
    </div>
    <div class="promo__desc">
      <div v-if="buttons" class="promo__genres">
        <UIButton
            v-for="item in items"
            :key="item.name"
            :label="item.name"
            color="accent2"
            rounded="rounded"
            @click="$router.push(`/genres/${item.name}`)"
        />
      </div>
      <div v-if="search" class="promo__search">
        <USearch
            :model-value="searchQuery"
            @input="setSearchQuery($event)"
            type="banner"
        />
      </div>
      <h1 v-if="title" class="promo__title">
        {{ title }}
      </h1>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import UIButton from '@/components/UI/UIButton.vue';
import USearch from '@/components/USearch.vue';
import { Getter, Mutation } from 'vuex-class';

@Component({
  components: { USearch, UIButton },
})
export default class USlider extends Vue {
  @Prop() items: object = [];
  @Prop({type: Boolean, default: false}) buttons?: boolean;
  @Prop({type: Boolean, default: false}) search?: boolean;
  @Prop() title?: string;
  @Prop({ required: true })
  imageUrl!: string;
  private offsetY = 0;
  private imageHeight = 0;
  private maxOffset = 80;
  private promoHeight = 0;

  @Getter('moviesList') moviesList!: any[];
  @Getter('searchQuery') searchQuery!: '';

  @Mutation('SET_SEARCH_QUERY') setSearchQuery!: (searchQuery: string) => void;


  private handleMouseMove(event: MouseEvent) {
    const el = this.$refs.parallax as HTMLElement;
    const height = el.clientHeight;
    const width = el.clientWidth;
    const x = event.pageX - el.offsetLeft - width / 2;
    const y = event.pageY - el.offsetTop - height / 2;
    const scale =
        1 +
        (this.maxOffset / Math.max(width, height)) *
        Math.max(Math.abs(x), Math.abs(y)) /
        Math.max(width, height);

    this.imageHeight = height + this.maxOffset * 2;
    this.offsetY = (this.maxOffset * y) / height;

    // добавляем проверку на максимальную высоту .promo
    const promo = el.closest('.promo') as HTMLElement;
    const promoRect = promo.getBoundingClientRect();
    const maxPromoHeight = 600;
    this.promoHeight = Math.min(
        Math.max(380 - (window.scrollY - promoRect.top) / 2, this.imageHeight),
        maxPromoHeight
    );

    el.style.transform = `scale(${scale})`;
  }


  private mounted() {
    const el = this.$refs.parallax as HTMLElement;
    el.addEventListener('mousemove', this.handleMouseMove);

  }

  private beforeDestroy() {
    const el = this.$refs.parallax as HTMLElement;
    el.removeEventListener('mousemove', this.handleMouseMove);
  }

  async created() {
    this.searchQuery = this.$store.state.movies.searchQuery;
    this.imageHeight = 380;
    this.promoHeight = 380;
  }

}
</script>

<style lang="scss" scoped>
.promo {
  position: relative;
  min-height: 380px;
  max-height: 380px;
  overflow: hidden;
  transition: height 1.5s ease-out;
  &__parallax {
    width: 100%;
    height: 100%;
    min-height: 380px;
    max-height: 750px;
    background-size: cover;
    background-repeat: no-repeat;
    object-fit: cover;
    transition: background-position-y 2s ease-out, transform 2s ease-out;
    transform: scale(1);
  }
  &__desc {
    position: absolute;
    width: 100%;
    top: 85px;
    display: flex;
    flex-direction: column;
    gap: 80px;
    align-items: center;
    justify-content: center;
    border-radius: 12px;
  }
  &__genres {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    gap: 20px;
    opacity: 0.8;
  }
  &__search {
    width: 40%;
  }
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
@media only screen and (max-width: 750px) {
  .promo__search {
    width: 100%;
    padding: 0 20px;
  }
}
@media only screen and (max-width: 450px) {
  .promo {
    &__desc {
      top: 50%;
      transform: translateY(-50%);
    }
    &__genres {
      display: none;
    }
  }
}
</style>