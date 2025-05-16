<template>
  <header class="flex py-8 px-4 bg-blue-500">
    <div class="container mx-auto">
      <div class="flex justify-between">
        <h1 class="text-3xl text-white">Dicionary Challenge</h1>
        <div class="flex items-center gap-5">
          <user-thumbnail :name="authStore.userName"></user-thumbnail>
          <button @click="handleLogout" class="text-lg text-white">Sair</button>
        </div>
      </div>
    </div>
  </header>
</template>
<script setup>
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/authStore'
import UserThumbnail from '@components/molecules/UserThumbnail.vue'

const router = useRouter()
const authStore = useAuthStore()

function handleLogout() {
  authStore.logout()
  router.push('/signin')
}
</script>
