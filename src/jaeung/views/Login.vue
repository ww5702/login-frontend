<template>
  <div class="login">
    <h2>로그인</h2>
    <input v-model="userId" placeholder="아이디" />
    <input v-model="password" type="password" placeholder="비밀번호" />

    <div class="buttons">
      <button @click="login">로그인</button>
      <button @click="goToSignUp">회원가입</button>
      <button @click="goBack">돌아가기</button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'

const userId = ref('')
const password = ref('')
const router = useRouter()

const login = async () => {
  console.log('로그인 시도:', {
  userId: userId.value,
  password: password.value,
})

  if (!userId.value || !password.value) {
    alert('아이디와 비밀번호를 모두 입력해주세요.')
    return
  }

  try {
    const response = await axios.post('/api/users/login', {
        userId: userId.value,
        password: password.value,
    })

    if (response.data === true) {
      alert('로그인 성공!')
      router.push('/jaeung/home')
    } else {
      alert('로그인 실패: 아이디 또는 비밀번호가 틀렸습니다.')
    }
  } catch (error) {
    console.error('로그인 오류:', error.response?.data || error.message)
    alert('서버 오류: ' + (error.response?.data?.message || error.message))
  }
}

const goToSignUp = () => {
  router.push('/jaeung/signup')
}

const goBack = () => {
  router.push('/')
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
