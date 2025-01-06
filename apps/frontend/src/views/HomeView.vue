<script setup lang="ts">
import { api } from 'libs/src/eden'
import { User } from 'backend/src/model/user'
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

// Add proper typing and states
const users = ref<typeof User.static[]>([])
const isLoading = ref(true)
const error = ref<string | null>(null)
const router = useRouter()

// Separate data fetching logic into a function
const fetchUsers = async () => {
  try {
    isLoading.value = true
    const response = await api.api.v1.users.get()
    users.value = response?.data?.data ?? []
  } catch (e) {
    error.value = 'Failed to load users'
    console.error(e)
  } finally {
    isLoading.value = false
  }
}

// Call on component mount
onMounted(() => {
  fetchUsers()
})
</script>

<template>
  <div class="w-full h-full flex flex-col items-center justify-center bg-gray-50">
    <div class="flex flex-col items-center rounded-md bg-gray-200 min-w-[300px] min-h-[300px] p-4">
      <p class="text-2xl font-bold">Select User</p>
      
      <!-- Loading state -->
      <div v-if="isLoading" class="mt-4">
        Loading users...
      </div>

      <!-- Error state -->
      <div v-else-if="error" class="mt-4 text-red-500">
        {{ error }}
      </div>

      <!-- Users list -->
      <div v-else-if="users.length" class="w-full mt-4 flex flex-col gap-2">
        <button v-for="userItem in users" 
             :key="userItem.id"
             @click="router.push(`/${userItem.username}/explorer`)"
             class="p-2 hover:bg-gray-300 rounded cursor-pointer">
          {{ userItem.name }}
        </button>
      </div>

      <!-- Empty state -->
      <div v-else class="mt-4">
        No users found
      </div>
    </div>
  </div>
</template>
