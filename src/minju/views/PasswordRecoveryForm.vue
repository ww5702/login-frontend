<template>
  <div class="space-y-4">
    <input v-model="email" type="email" placeholder="이메일" class="input" />
    <button @click="recover" class="btn">인증하기</button>
  </div>
</template>

<script setup>
import "../PurpleTone.css";
import { ref } from "vue";
const email = ref("");

function recover() {
  const payload = { email: email.value };
  emit("submitData", payload);
}
defineEmits(["submitData"]);
</script>

<style scoped>
.input {
  @apply w-full p-2 border border-purple-300 rounded-lg;
}
.btn {
  @apply w-full p-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600;
}
</style>
