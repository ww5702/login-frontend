<template>
    <div class="signup">
      <h2>회원가입</h2>
      <input v-model="userId" placeholder="아이디" />
      <input v-model="name" placeholder="이름" />
      <input v-model="nickname" placeholder="닉네임" />
      <input v-model="password" type="password" placeholder="비밀번호" />
      <input v-model="phone" placeholder="전화번호" />
      <button @click="signUp">가입하기</button>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  import { useRouter } from 'vue-router'
  
  const userId = ref('')
  const name = ref('')
  const nickname = ref('')
  const password = ref('')
  const phone = ref('')
  const router = useRouter()
  
  const signUp = () => {
    if (userId.value && name.value && nickname.value && password.value && phone.value) {
      alert('회원가입 성공!')
      router.push('/jaeung')
    } else {
      alert('모든 항목을 입력해주세요.')
    }
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
  