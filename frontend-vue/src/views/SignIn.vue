<template>
  <div class="flex flex-col items-center justify-center h-screen">
    <form @submit.prevent="handleLogin" class="w-80 space-y-4">
      <h1 class="text-2xl font-bold text-center">Entrar</h1>
      <input v-model="credentials.email" type="email" placeholder="Email" class="w-full p-2 border rounded" required />
      <input v-model="credentials.password" type="password" placeholder="Senha" class="w-full p-2 border rounded" required />
      <button type="submit" class="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700" :disabled="isLoading">
        {{ isLoading ? "Enviando" : "Entrar" }}
      </button>
      <p v-if="error" class="text-red-500 text-sm text-center">{{ error }}</p>
      <p class="text-sm text-center">
        Não tem uma conta?
        <router-link to="/signup" class="text-blue-600 hover:underline">Cadastrar</router-link>
      </p>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/authStore'

const error = ref('');
const router = useRouter();
const authStore = useAuthStore()

const isLoading = computed(() => authStore.isLoading)
const credentials = reactive({
  email: '',
  password: '',
})

const validations = reactive({
  email: computed(() => /\S+@\S+\.\S+/.test(credentials.email)),
  password: computed(() => credentials.password.trim().length > 0),
})

const isFormValid = computed(() => validations.password && validations.email)

async function handleLogin() {
  if (!isFormValid.value) return

  await authStore.login(credentials)
    .then(() => router.push('/home'))
    .catch(() => error.value = 'Erro ao efetuar o login. Tente novamente.')
}
</script>
