<template>
  <div class="container mt-5">
    <h2>회원가입</h2>

    <input v-model="userId" type="text" class="form-control mb-2" placeholder="아이디를 입력하세요" />
    <input v-model="userName" type="text" class="form-control mb-3" placeholder="이름을 입력하세요" />
    <input v-model="nickname" type="text" class="form-control mb-3" placeholder="닉네임을 입력하세요" />
    <input v-model="password" type="password" class="form-control mb-3" placeholder="비밀번호를 입력하세요" />
    <input v-model="phoneNumber" type="tel" class="form-control mb-3" placeholder="전화번호를 입력하세요" />

    <button class="btn btn-success" @click="register">가입하기</button>
  </div>
</template>

  
<script setup>
  import { ref } from 'vue'
  import { useRouter } from 'vue-router'
  import axios from 'axios'

  const router = useRouter()

  const userId = ref('')
  const userName = ref('')
  const nickname = ref('')
  const password = ref('')
  const phoneNumber = ref('')
    
  const register = async () => {
    try {
      const response = await axios.get('/api/users/all')
      const users = response.data
      console.log(response.data)

      const isDuplicate = users.some(user => user.userId === userId.value)
      if (isDuplicate) {
        alert('이미 존재하는 ID입니다. 다른 ID를 입력해주세요.')
        return
      }

      // 중복 없으면 회원가입 진행
      await axios.post('/api/users', {
        userId: userId.value,
        userName: userName.value,
        nickname: nickname.value,
        password: password.value,
        phoneNumber: phoneNumber.value
      })

      alert('회원가입 성공! 로그인 화면으로 이동합니다.')
      router.push('/sil')
    } catch (error) {
      console.error(error)
      alert('회원가입 중 오류가 발생했습니다.')
    }
  }
</script>