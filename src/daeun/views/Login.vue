<template>
  <div class="login-container">
    <div class="login-box">
      <h2>로그인</h2>
      <input type="text" v-model="userId" placeholder="아이디" />
      <input type="password" v-model="password" placeholder="비밀번호" />
      <button @click="login">로그인</button>
      <div v-if="errorMessage" class="error">{{ errorMessage }}</div>
      <div class="mb-1">
        계정이 없으신가요?
        <a href="#" @click.prevent="goToSignUp">회원가입</a>
      </div>
    </div>
  </div>
</template>

<script setup>
import {ref} from 'vue';
import { useRouter } from 'vue-router';

const userId = ref('');
const password = ref('');
const errorMessage = ref('');
const router = useRouter();

const login = async () => {
  if (!userId.value || !password.value) {
    errorMessage.value = '아이디와 비밀번호를 입력해주세요';
    return;
  }
  // 콘솔에 아이디와 비밀번호 출력
  console.log('아이디:', userId.value);
  console.log('비밀번호:', password.value);
}

const goToSignUp = () => {
  router.push('/daeun/Signup')
}
</script>

<style scoped>
.login-container {
  display: flex;
  justify-content: center; /* 가로로 중앙 정렬 */
  align-items: center; /* 세로로 중앙 정렬 */
  height: 100vh;
  background-color: #f0f0f0;
}

.login-box {
  display: flex;
  flex-direction: column; /* 세로로 배치 */
  gap: 10px;
  padding: 20px;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  width: 300px;
  text-align: center;
}

input {
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

button {
  padding: 10px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background-color: #0056b3;
}

a {
  color: #007bff;
  text-decoration: none;
}

.error {
  color: red;
  font-size: 14px;
  margin-top: 5px;
}
</style>
