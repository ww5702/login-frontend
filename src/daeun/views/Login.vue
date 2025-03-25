<template>
  <div class="login-container">
    <div class="login-box">
      <div class="logo">
        <div class="logo-circle">
          <span>U</span>
        </div>
      </div>
      <h2>로그인</h2>
      <input type="text" v-model="userId" placeholder="아이디" />
      <input type="password" v-model="userPw" placeholder="비밀번호" />
      <button @click="login">로그인</button>
      <div v-if="errorMessage" class="error">{{ errorMessage }}</div>
      <div v-if="successMessage" class="success">{{ successMessage }}</div>
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
import Axios from 'axios';

const userId = ref('');
const userPw = ref('');
const errorMessage = ref('');
const successMessage = ref('');
const router = useRouter();

const login = async () => {
  if (!userId.value || !userPw.value) {
    errorMessage.value = '아이디와 비밀번호를 입력해주세요';
    return;
  }

  const url = '/api/users/login';
  const requestBody = {
    userId: userId.value,
    password: userPw.value
  };

  try {
    // 서버에 로그인 요청을 보냄
    const response = await Axios.post(url, requestBody);

    // 서버에서 응답이 true인 경우 로그인 성공 처리
    if (response.status === 200 && response.data === true) {
      successMessage.value = "로그인 성공했습니다! 다음 페이지로 이동합니다.";
      errorMessage.value = '';  // 에러 메시지 초기화
      setInit();  // 초기화 작업 수행

      // 1초 후에 성공 페이지로 이동
      setTimeout(() => {
        router.push('/daeun/success');  // 로그인 성공 후 이동할 페이지
      }, 1000);  // 1초 뒤에 실행
    } else {
      // 로그인 실패 시
      errorMessage.value = '아이디 또는 비밀번호가 잘못되었습니다.';
    }
  } catch (error) {
    // 요청 실패 시
    console.error("로그인 실패 원인:", error);  // 에러 로그 출력
    errorMessage.value = '로그인 실패! 잠시 후 다시 시도해주세요';
  } finally {
    // 성공/실패와 관계없이 항상 호출
    setInit();
  }
};

const goToSignUp = () => {
  router.push('/daeun/Signup')
}

const setInit = () => {
  // 초기화 작업 (예: 입력 필드 값 초기화)
  userId.value = ''
  userPw.value = ''
}
</script>

<style scoped>
.login-container {
  display: flex;
  justify-content: center; /* 가로로 중앙 정렬 */
  align-items: center; /* 세로로 중앙 정렬 */
  height: 100vh;
  background: linear-gradient(135deg, #f5f7fa 0%, #e4e8f0 100%);
  padding: 20px;
}

.login-box {
  display: flex;
  flex-direction: column; /* 세로로 배치 */
  gap: 20px;
  padding: 30px;
  background-color: white;
  border-radius: 12px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
  width: 300px;
  text-align: center;
}

.logo {
  display: flex;
  justify-content: center;
  margin-bottom: 15px;
}

.logo-circle {
  width: 60px;
  height: 60px;
  background: linear-gradient(135deg, #4a90e2 0%, #3273dc 100%);
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.logo-circle span {
  color: white;
  font-size: 28px;
  font-weight: bold;
}

h2 {
  margin: 0 0 10px 0;
  color: #2c3e50;
  font-size: 24px;
  text-align: center;
}

input {
  padding: 12px 15px;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  font-size: 14px;
  transition: all 0.3s;
  background-color: #f8fafc;
}

input:focus {
  outline: none;
  border-color: #3182ce;
  box-shadow: 0 0 0 3px rgba(49, 130, 206, 0.1);
  background-color: white;
}

input::placeholder {
  color: #a0aec0;
}

button {
  padding: 14px;
  background: linear-gradient(135deg, #4a90e2 0%, #3273dc 100%);
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;
  box-shadow: 0 4px 6px rgba(50, 115, 220, 0.2);
}

button:hover {
  background: linear-gradient(135deg, #3273dc 0%, #2563eb 100%);
  transform: translateY(-2px);
  box-shadow: 0 6px 8px rgba(50, 115, 220, 0.3);
}

a {
  color: #3182ce;
  text-decoration: none;
  font-weight: 600;
  transition: color 0.3s;
}

a:hover {
  color: #2b6cb0;
  text-decoration: underline;
}

.error {
  color: #e53e3e;
  font-size: 14px;
  margin-top: 5px;
}

.success {
  color: #38a169;
  font-size: 14px;
  margin-top: 10px;
}
</style>
