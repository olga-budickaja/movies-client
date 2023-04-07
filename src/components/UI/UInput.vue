<template>
  <div class="form-input" :style="{width: width}">
    <ValidationProvider :name="label" :rules="rules" v-slot="{ errors }">
      <input
          class="input-text"
          :type="type"
          :name="name"
          :id="name"
          :placeholder="placeholder"
          v-model="modelValue"
          :value="modelValue"
          @input="$emit('input', $event.target.value)"
          autocomplete="new-password"
      />
      <label :for="name" class="input-label">{{ label }}</label>
      <div v-if="errors.length" class="form-error">{{ errors[0] }}</div>
    </ValidationProvider>

  </div>
</template>

<script lang="ts">
import {Component, Prop, Vue} from 'vue-property-decorator';

@Component
export default class UInput extends Vue {
 @Prop() errors?: string | object;
 @Prop({type: String, default: ''}) modelValue?: string;
 @Prop({type: String, default: ''}) value?: string;
 @Prop({type: String, default: 'text'}) type?: string;
 @Prop({type: String, default: '300px'}) width?: string;
 @Prop() name!: string;
 @Prop() placeholder!: string;
 @Prop() label!: string;
 @Prop() rules?: void;
 @Prop() autocomplete?: boolean;

  created() {
    this.$watch('value', (newValue) => {
      this.modelValue = newValue;
    });
  }
}
</script>

<style lang="scss" scoped>
.form {
  &-input {
    margin-bottom: 30px;
    position: relative;
  }
  &-error {
    background: var(--color-red);
    margin-top: 4px;
    border-radius: 7px;
    font-size: 13px;
    color: #fff;
    padding: 5px;
  }
}
.input {
  &-text {
    border: 1px solid var(--background-color);
    background: var(--background-color1);
    padding: 0 10px;
    height: 40px;
    border-radius: 7px;
    font-size: 15px;
    width: 100%;
    position: relative;
    z-index: 1;
    &:focus {
      outline: none;
      & + .input-label {
        z-index: 1;
        opacity: 1;
        top: -20px;
      }
    }
    &:not(:placeholder-shown) {
      & + .input-label {
        z-index: 1;
        opacity: 1;
        top: -20px;
      }
    }
  }
  &-label {
    font-weight: bold;
    display: block;
    position: absolute;
    top: 20px;
    opacity: 0;
    z-index: -1;
    transition: .3s;
    font-size: 13px;
    color: var(--color-orange);
  }
}
.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}
.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>