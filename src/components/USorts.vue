<template>
  <div class="sort">
    <h2 class="title title_fz16 sort__title">{{ $t('sort.title') }}:</h2>
    <div class="sort__wrapp">
        <UIButton
            v-for="item in buttons"
            :key="item.id"
            class="login__animate"
            :label="$t(`sort.${item.name}`)"
            color="yellow"
            outlined="outlined"
            rounded="rounded"
            :icon-button="item.icon"
            @click="movieSort(item.name)"
        />
    </div>
  </div>
</template>

<script lang="ts">
import {Component, Prop, Vue} from 'vue-property-decorator';
import UIButton from "@/components/UI/UIButton.vue";

@Component({
  components: {UIButton}
})
export default class USorts extends Vue {

  @Prop() popularity?: number;
  @Prop() budget?: number;
  @Prop() date?: Date;
  @Prop() sortMovies!: (field: string) => void;
  @Prop() buttons!: any[]

  movieSort(fieldName: string) {
    this.$emit('sort-movies', fieldName)
  }

}
</script>

<style lang="scss" scoped>
.sort {
  display: flex;
  margin-top: 80px;
  gap: 30px;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  &__title {
    margin: 0;
  }
  &__wrapp {
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
    justify-content: center;
  }
}
</style>