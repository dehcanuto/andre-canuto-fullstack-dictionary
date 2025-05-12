<template>
  <div class="flex flex-col items-center justify-center h-screen">
    <form @submit.prevent="handleLogin" class="w-80 space-y-4">
      <h1 class="text-2xl font-bold text-center">Entrar</h1>
      <input v-model="email" type="email" placeholder="Email" class="w-full p-2 border rounded" required />
      <input v-model="password" type="password" placeholder="Senha" class="w-full p-2 border rounded" required />
      <button type="submit" class="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">Entrar</button>
      <p v-if="error" class="text-red-500 text-sm text-center">{{ error }}</p>
      <p class="text-sm text-center">
        Não tem uma conta?
        <router-link to="/signup" class="text-blue-600 hover:underline">Cadastrar</router-link>
      </p>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { login } from '../services/auth';

const email = ref('');
const password = ref('');
const error = ref('');
const router = useRouter();

async function handleLogin() {
  try {
    await login(email.value, password.value);
    router.push('/home');
  } catch (err) {
    error.value = 'Login inválido';
  }
}
</script>
