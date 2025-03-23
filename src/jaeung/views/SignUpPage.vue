<template>
    <div class="signup">
      <h2>회원가입</h2>
      <input v-model="userId" placeholder="아이디" />
      <input v-model="name" placeholder="이름" />
      <input v-model="nickname" placeholder="닉네임" />
      <input v-model="password" type="password" placeholder="비밀번호" />
      <input v-model="phone" placeholder="전화번호" />
      <button @click="signUp">가입하기</button>
      <button @click="goBack">돌아가기</button>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  import { useRouter } from 'vue-router'
  import axios from 'axios'
  
  const userId = ref('')
  const name = ref('')
  const nickname = ref('')
  const password = ref('')
  const phone = ref('')
  const router = useRouter()
  
  const signUp = async () => {
  try {
    const response = await axios.post('/api/users', {
      userId: userId.value,
      userName: name.value,
      nickname: nickname.value,
      password: password.value,
      phoneNumber: phone.value,
    })

    // 응답 구조에 따라 분기 처리
    if (response.status === 201) {
      alert('회원가입 성공!')
      router.push('/jaeung')
    } else {
      alert('회원가입 실패: 알 수 없는 상태')
    }
  } catch (error) {
    if (error.response) {
        const msg = error.response.data.message
        if (msg.includes('constraint')) {
            alert('회원가입 실패: 이미 존재하는 아이디 또는 닉네임입니다.')
        } else {
            alert('회원가입 실패: ' + msg)
        }
    } else {
      alert('서버 연결 실패: ' + error.message)
    }
  }
}

  const goBack = () => {
    router.push('/jaeung')
  }
  </script>
  
  <style scoped>
  .signup {
    max-width: 400px;
    margin: 100px auto;
    padding: 1rem;
  }
  input {
    display: block;
    width: 100%;
    margin-bottom: 1rem;
    padding: 0.5rem;
  }
  button {
    padding: 0.5rem 1rem;
    width: 100%;
  }
  </style>
  