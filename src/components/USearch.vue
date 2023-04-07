<template>
  <div :class="['search', {'search-banner': type === 'banner'}]">
    <font-awesome-icon icon="fa-solid fa-magnifying-glass" />
    <input
        :placeholder="$t('right-menu.search')"
        :class="['search__input', {'search__banner': type === 'banner'}]"
        v-model="modelValue"
        @input="updateInput"
    />
  </div>
</template>

<script lang="ts">
import {Component, Prop, Vue} from 'vue-property-decorator';

@Component
export default class USearch extends Vue {
  @Prop({ type: String, default: '' }) modelValue!: string;
  @Prop() type?: string;

    updateInput(event: any) {
      this.$emit('input', event.target.value)
    }
}
</script>

<style lang="scss" scoped>
.search {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  background: var(--background-color1);
  border-radius: 20px;
  padding: 0 20px;
  &-banner {
    border-radius: 40px;
    opacity: 0.8;
  }
  &__input {
    border: none !important;
    height: 30px !important;
    width: 95%;
    background: transparent;
    &:focus {
      outline: none;
    }
    &::placeholder {
      font-weight: 100;
      color: #767b88;
      font-style: italic;
    }
  }
  &__banner {
    border: none !important;
    height: 60px !important;
    width: 93%;
    &::placeholder {
      font-weight: 600;
      font-size: 16px;
      font-style: italic;
    }
  }
}
@media only screen and (max-width: 450px) {
  .search__banner {
    height: 40px !important;
  }
}
</style>