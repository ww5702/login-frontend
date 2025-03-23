<template>
  <div class="login">
    <h2>로그인</h2>
    <input v-model="userId" placeholder="아이디" />
    <input v-model="password" type="password" placeholder="비밀번호" />

    <div class="buttons">
      <button @click="login">로그인</button>
      <button @click="goToSignUp">회원가입</button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const userId = ref('')
const password = ref('')
const router = useRouter()

const login = () => {
  if (userId.value && password.value) {
    // 실제 인증 로직은 서버 연동 후에 구현
    alert('로그인 성공!')
    router.push('/jaeung/home')
  } else {
    alert('아이디와 비밀번호를 입력해주세요.')
  }
}

const goToSignUp = () => {
  router.push('/jaeung/signup')
}
</script>

<style scoped>
.login {
  max-width: 400px;
  margin: 100px auto;
  padding: 1rem;
  text-align: center;
}
input {
  display: block;
  width: 100%;
  margin-bottom: 1rem;
  padding: 0.5rem;
}
.buttons button {
  margin: 0.5rem;
  padding: 0.5rem 1rem;
}
</style>
