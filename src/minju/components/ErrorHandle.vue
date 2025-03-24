<script setup>
import { ref } from "vue";

const props = defineProps({
  isVisible: {
    type: Boolean,
    default: false,
  },
  message: {
    type: String,
    default: "에러입니다. 죄송합니다. 다시 시도해 주세요.",
  },
});

const emit = defineEmits(["close"]);

const closeError = () => {
  emit("close");
};
</script>

<template>
  <div v-if="isVisible" class="error-modal">
    <div class="error-content">
      <img src="../assets/sorry.png" alt="Sorry" class="error-image" />
      <p class="error-message">{{ message }}</p>
      <button class="btn-primary" @click="closeError">확인</button>
    </div>
  </div>
</template>

<style scoped>
.error-modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.error-content {
  background-color: white;
  padding: 2rem;
  border-radius: 8px;
  text-align: center;
  max-width: 700px;
  width: 90%;
}

.error-image {
  width: 500px;
  height: 500px;
  margin-bottom: 1rem;
}

.error-message {
  font-size: 1.2rem;
  color: #333;
  margin-bottom: 1.5rem;
}

.btn-primary {
  padding: 0.5rem 2rem;
  background-color: #4a90e2;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.btn-primary:hover {
  background-color: #357abd;
}
</style>
