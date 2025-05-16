<template>
  <div class="flex flex-col items-center justify-center h-screen">
    <form @submit.prevent="handleSignup" class="w-80 space-y-4">
      <h1 class="text-2xl font-bold text-center">Criar Conta</h1>
      <input
        v-model="name"
        type="text"
        placeholder="Nome"
        class="w-full p-2 border rounded"
        required
      />
      <input
        v-model="email"
        type="email"
        placeholder="Email"
        class="w-full p-2 border rounded"
        required
      />
      <input
        v-model="password"
        type="password"
        placeholder="Senha"
        class="w-full p-2 border rounded"
        required
      />
      <button type="submit" class="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700">
        Cadastrar
      </button>
      <p v-if="error" class="text-red-500 text-sm text-center">{{ error }}</p>
      <p class="text-sm text-center">
        Já tem uma conta?
        <router-link to="/signin" class="text-blue-600 hover:underline">Entrar</router-link>
      </p>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { signup } from '../services/auth'

const name = ref('')
const email = ref('')
const password = ref('')
const error = ref('')
const router = useRouter()

async function handleSignup() {
  try {
    await signup(name.value, email.value, password.value)
    router.push('/signin')
  } catch (err) {
    error.value = 'Erro ao criar conta'
  }
}
</script>
