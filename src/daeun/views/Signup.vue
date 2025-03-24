<template>
<div class="signup-container">
  <div class="signup-box">
    <h2>회원가입</h2>
    <input type="text" v-model="username" placeholder="이름" />
    <input type="text" v-model="userId" placeholder="아이디" />
    <input type="password" v-model="password" placeholder="비밀번호" />
    <input type="password" v-model="confrimPassword" placeholder="비밀번호 확인"/>

    <button @click="register">가입하기</button>

    <div v-if="errorMessage" class="error">{{ errorMessage }}</div>
    <div v-if="successMessage" class="success">{{ successMessage }}</div>
    <div class="mb-1">이미 계정이 있으신가요?
      <a href="#" @click.prevent="goToLogin">로그인</a>
    </div>

  </div>
  
</div>

</template>


<script setup>
import {ref} from 'vue';
import {useRouter} from "vue-router";

const router = useRouter();

const username = ref('');
const userId = ref('');
const password = ref('');
const confrimPassword = ref('');
const errorMessage = ref('');
const successMessage = ref(''); 

const register = () => {
  if (!username.value || !userId.value || !password.value || !confrimPassword.value){
    errorMessage.value = '모든 필드를 입력해주세요';
    return;
  }

  if (password.value !== confrimPassword.value){
    errorMessage.value = "비밀번호가 일치하지 않습니다.";
    return;
  }

  console.log("회원가입 시도:",{
  username: username.value,
  userId: userId.value,
  password: password.value,
  confrimPassword: confrimPassword.value
})
  alert("회원가입이 성공했습니다! 로그인 페이지로 이동합니다.");

  router.push('/daeun')

}

const goToLogin = () => {
  router.push('/daeun')
}

</script>



<style scoped>
.signup-container {
  display: flex;
  justify-content: center; /* 가로로 중앙 정렬 */
  align-items: center; /* 세로로 중앙 정렬 */
  height: 100vh;
  background-color: #f0f0f0;
}

.signup-box {
  display: flex;
  flex-direction: column; /* 세로로 배치 */
  gap: 10px;
  padding: 20px;
  width: 300px;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  text-align: center;
}

h2 {
  text-align: center;
  margin-bottom: 10px;
}

form {
  display: flex;
  flex-direction: column;
  gap: 10px;
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
  margin-top: 5px;
}

button:hover {
  background-color: #0056b3;
}

.error {
  color: red;
  font-size: 14px;
  margin-top: 5px;
}

.success {
  color: green;
  font-size: 14px;
  margin-top: 5px;
}

a {
  color: #007bff;
  text-decoration: none;
}

a:hover {
  text-decoration: underline;
}
</style>