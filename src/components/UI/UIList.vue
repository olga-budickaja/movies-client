<template>
  <ul :class="['list', {'list-column': type === 'column'}]">
    <li
        v-for="item in items"
        :key="item.name"
        :class="['list__item', {'list__drop': item.drop}]"
    >
      <router-link :to="item?.link">{{ $t(`menu.${item.name}`) }}</router-link>
      <div
          v-if="item.drop"
          :class="['list__wrapp', {show: isMenuDrop}]"
      >
        <ul>
          <li
              v-for="dropItem in dropItems"
              :key="dropItem.name"
              class="list__item"
          >
            <router-link :to="dropItem.link">
              {{ dropItem.name }}
              <span class="list__item-count">{{ dropItem.count }}</span>
            </router-link>
          </li>
        </ul>
      </div>
      <ul :class="['list list-column list__sub', {'list-vertical': typeMenu === 'vertical'}]" v-else-if="item.sub">
        <li
            v-for="subItem in subItems"
            :key="subItem.name"
            class="list__item"
        >
          <router-link :to="subItem.link">
            {{ subItem.name }}
            <span class="list__item-count">{{ subItem.count }}</span>
          </router-link>
        </li>
      </ul>
    </li>
  </ul>
</template>

<script lang="ts">
import {Component, Prop, Vue} from 'vue-property-decorator';

@Component
export default class UIList extends Vue {
@Prop() items!: object[];
@Prop() dropItems?: object[];
@Prop() subItems?: any;
@Prop({ type: String, default: 'flex' }) type?: string;
@Prop() itemDrop?: string;
@Prop() itemSub?: string;
@Prop() typeMenu?: string;

isMenuDrop = false;
}
</script>

<style lang="scss" scoped>
.list {
  display: flex;
  justify-content: center;
  gap: 20px;
  text-transform: uppercase;
  list-style-type: none;
  background: var(--background-color);
  &-vertical {
    justify-content: flex-start;
  }
  &-column {
    flex-direction: column;
    gap: 10px;
  }

  &__item {
    position: relative;
    cursor: pointer;
    padding: 7px 12px;
    border-radius: 7px;
    transition: .5s ease-in-out;
    &-count {
      font-size: 10px;
      color: var(--color-red);
    }
    &:hover {
      background: var(--background-color1);
    }
  }
  &__sub {
    padding: 20px 30px;
    list-style-type: circle;
    border-radius: 7px;
    max-height: calc(100vh - 440px);
    overflow-y: auto;
    &:hover {
      background: var(--background-color);
    }
  }
  &__wrapp {
    position: absolute;
    top: 40px;
    left: 50%;
    transform: translateX(-50%);
    padding: 15px 14px 15px 45px;
    background: var(--background-color);
    box-shadow: 8px 8px 10px rgba(0, 0, 0, 0.07);
    border-radius: 7px;
    opacity: 0;
    display: none;
    transition: .2s;
    max-height: calc(100vh - 440px);
    overflow-y: auto;
  }
  &__drop:hover .list__wrapp {
    opacity: 1;
    display: block;
    pointer-events: auto;
  }
}
.show {
  display: block !important;
}
</style>