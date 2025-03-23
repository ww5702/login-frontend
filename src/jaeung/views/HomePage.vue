<template>
    <div class="home">
      <h2 class="title">🎉 랜덤 추첨 이벤트 🎉</h2>
  
      <div class="user-grid">
        <div
          v-for="(user, index) in users"
          :key="index"
          :class="['user-card', selectedIndex === index ? 'selected' : '']"
        >
          {{ user }}
        </div>
      </div>
  
      <button @click="pickRandom" class="pick-button">
        🍀 한 명 뽑기!
      </button>
      <button @click="goToLogin" class="pick-button">
        🔙 로그인 페이지로
      </button>
  
      <div v-if="selectedIndex !== null" class="result-message">
        🎊 축하합니다! <strong>{{ users[selectedIndex] }}</strong>님이 당첨되셨습니다 🎊
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  import { useRouter } from 'vue-router'
  const router = useRouter()
  
  const users = ['김다은', '이재웅', '진실', '김민주', '이효정', '손지영']
  const selectedIndex = ref(null)
  
  const pickRandom = () => {
    selectedIndex.value = null
    setTimeout(() => {
      selectedIndex.value = Math.floor(Math.random() * users.length)
    }, 500)
  }
    const goToLogin = () => {
        router.push('/jaeung') // 로그인 페이지 경로에 맞춰 수정
    }
  </script>
  
  <style scoped>
  .main-container {
    max-width: 600px;
    margin: 80px auto;
    padding: 2rem;
    text-align: center;
    border-radius: 20px;
    background: linear-gradient(135deg, #f0f8ff, #e0ffff);
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
  }
  
  .title {
    font-size: 2rem;
    font-weight: bold;
    margin-bottom: 1.5rem;
    color: #333;
  }
  
  .user-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1rem;
    margin-bottom: 2rem;
  }
  
  .user-card {
    padding: 1rem;
    background-color: #a5d8ff;
    color: #003366;
    font-weight: bold;
    border-radius: 12px;
    transition: transform 0.3s, background-color 0.3s;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }
  
  .user-card.selected {
    background-color: #69db7c;
    color: white;
    transform: scale(1.1);
    box-shadow: 0 0 10px 3px #b2f2bb;
  }
  
  .pick-button {
    padding: 0.75rem 2rem;
    background-color: #ff6b6b;
    color: white;
    font-size: 1.1rem;
    border: none;
    border-radius: 12px;
    cursor: pointer;
    transition: background-color 0.3s;
  }
  
  .pick-button:hover {
    background-color: #fa5252;
  }
  
  .result-message {
    margin-top: 1.5rem;
    font-size: 1.3rem;
    color: #2f9e44;
  }
  </style>
  