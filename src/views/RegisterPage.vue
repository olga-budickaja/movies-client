<template>
  <div class="register" :style="bgStyle">
      <form class="form">
        <h1 class="title title_fz34">{{ $t('form.register.title') }}</h1>
        <ValidationObserver>
          <UInput
              :label="$t('form.firstName.label')"
              name="firstName"
              :placeholder="$t('form.firstName.placeholder')"
              v-model="firstNameField"
              rules="min:2|max:12"
          />
          <UInput
              :label="$t('form.lastName.label')"
              name="lastName"
              :placeholder="$t('form.lastName.placeholder')"
              v-model="lastNameField"
              rules="min:2|max:12"
          />
          <UInput
              :label="$t('form.email.label')"
              name="email"
              type="email"
              :placeholder="$t('form.email.placeholder')"
              v-model="emailField"
              rules="required|email"
          />
          <UInput
              :label="$t('form.password.label')"
              name="password"
              type="password"
              :placeholder="$t('form.password.placeholder')"
              v-model="passwordField"
              :model-value="passwordField"
              rules="required|min:6|max:18"
              autocomplete
          />
          <UInput
              :label="$t('form.confirmPassword.label')"
              name="confirmPassword"
              type="password"
              :placeholder="$t('form.confirmPassword.placeholder')"
              v-model="confirmPasswordField"
              :model-value="confirmPasswordField"
              rules="required|confirmed:passwordField"
              autocomplete
          />
          <UInput
              :label="$t('form.dateOfBirth.label')"
              name="dateOfBirth"
              type="date"
              :placeholder="$t('form.dateOfBirth.placeholder')"
              v-model="dateOfBirthField"
              rules="required|:date_format:dd/MM/yyyy|date_between:10/09/2016,20/09/2016"
          />
        </ValidationObserver>
      </form>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import UInput from '@/components/UI/UInput.vue';

@Component({
  components: { UInput },
})
export default class RegisterPage extends Vue {
  firstNameField: string = '';
  lastNameField: string = '';
  emailField: string = '';
  passwordField: string = '';
  confirmPasswordField: string = '';
  dateOfBirthField: string = '';

  get bgStyle() {
    return {
      backgroundImage: `url(${require('@/assets/bg-register.jpg')})`,
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
.form {
  background: var(--background-color);
  padding: 30px;
  border-radius: 8px;
  box-shadow: 8px 8px 10px rgba(0, 0, 0, 0.07);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
}
</style>