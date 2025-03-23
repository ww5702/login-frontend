<script setup>
import { ref, reactive } from 'vue';
import { useRouter } from 'vue-router';
import Axios from 'axios';

const router = useRouter();

const userId = ref('')
const userPw = ref('')
const userName = ref('')
const userNickname = ref('')
const userPhoneNumber = ref('')

const isUser = ref(false)
const checkLogin = ref(false)

const signin = async() => {
  const url = '/api/users/login'
  const requestBody = {
    userId: userId.value,
    password: userPw.value      
  }
  try {
    const response = await Axios.post(url, requestBody)
    isUser.value = response.data
    if (isUser.value) {
      alert('로그인 성공 !')
      router.push('/hyojeong/success')
    } else {
      alert('로그인 실패, 비밀번호가 일치하지 않습니다.')
      setInit()
    }
    
  } catch (error) {
    alert('로그인 실패, 회원 가입을 진행해주세요.')
    setInit()
    checkLogin.value = true
  }
}

const signup = async() => {
  const url = '/api/users'
  const requestBody = {
    userId: userId.value,
    password: userPw.value,
    userName: userName.value,
    nickname: userNickname.value,
    phoneNumber: userPhoneNumber.value
  }
  try {
    const response = await Axios.post(url, requestBody)
    alert('회원 가입 성공 ! 로그인을 진행해주세요.')
  } catch(error) {
    alert('회원 가입 실패 ! 잠시 후 다시 시도해주세요.')
  }
  setInit()
}

const setInit = async() => {
  userId.value = ''
  userPw.value = ''
  userName.value = ''
  userNickname.value = ''
  userPhoneNumber.value = ''

  checkLogin.value = false
}

</script>

<template>
  <div class="container-sm mt-3 border border-2 p-1" style="max-width: 600px">
    <div class="mb-3">
      <label for="inputUserId" class="form-label">ID</label>
      <input type="text" class="form-control" v-model="userId" id="inputUserId">
    </div>
    <div class="mb-3">
      <label for="inputUserPw" class="form-label">Password</label>
      <input type="password" class="form-control" v-model="userPw" id="inputUserPw">
    </div>
    <template v-if="isUser">
    </template>
    <template v-else-if="checkLogin">
      <div class="mb-3">
        <label for="inputUserName" class="form-label">User Name</label>
        <input type="text" class="form-control" v-model="userName" id="inputUserName">
      </div>
      <div class="mb-3">
        <label for="inputUserNickName" class="form-label">Nickname</label>
        <input type="text" class="form-control" v-model="userNickname" id="inputUserNickName">
      </div>
      <div class="mb-3">
        <label for="inputUserPhoneNumber" class="form-label">Phone Number</label>
        <input type="text" class="form-control" v-model="userPhoneNumber" id="inputUserPhoneNumber">
      </div>
    </template>
    <div class="row" style="opacity: 92%;">
      <div class="col">
        <button class="btn btn-primary mb-1 me-2" @click="signin">Sign In</button>
        <button v-if="checkLogin" class="btn btn-primary mb-1" @click="signup">Sign Up</button>
      </div>
    </div>
  </div>
</template>
