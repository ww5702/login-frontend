<template>
    <div class="container mt-5">
      <h2>로그인</h2>
      <input v-model="userId" class="form-control mb-2" placeholder="ID" />
      <input v-model="password" type="password" class="form-control mb-3" placeholder="Password" />
      <!-- <h1>Hello</h1>  -->
      <button class="btn btn-primary me-2" @click="login">로그인</button>
      <button class="btn btn-secondary" @click="goToSignup">회원가입</button>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios' // ❗axios import 필요!

const router = useRouter()
const userId = ref('')
const password = ref('')

const login = async () => {
  try {
    const response = await axios.post('/api/users/login', {
      userId: userId.value,
      password: password.value
    })

    console.log(response)

    if (response.data === true) {
      alert('로그인 성공!')
      router.push('/sil/hello')
    } else {
      alert('로그인 실패. ID 또는 PW를 확인하세요.')
    }
  } catch (error) {
    console.error('로그인 요청 실패:', error)
    console.error(error);
    alert('서버와 통신 중 문제가 발생했습니다.')
  }
}

const goToSignup = () => {
  router.push('/sil/signup')
}
</script>
  