<template>
  <div class="signup-container">
    <div class="signup-box">
      <div class="logo">
        <div class="logo-circle">
          <span>U</span>
        </div>
      </div>
      <h2>회원가입</h2>
      <p class="welcome-text">환영합니다! 아래 정보를 입력해주세요.</p>

        <label for="userId">아이디</label>
        <input 
          id="userId" 
          type="text" 
          v-model="user.userId" 
          placeholder="아이디를 입력해주세요"
          class="mb-1" 
        />

        <label for="userName">이름</label>
        <input 
          id="userName" 
          type="text" 
          v-model="user.userName" 
          placeholder="이름을 입력해주세요"
          class="mb-1"  
        />

        <label for="userNickname">닉네임</label>
        <input 
          id="userNickname" 
          type="text" 
          v-model="user.userNickname" 
          placeholder="닉네임을 입력해주세요"
          class="mb-1"  
        />

        <label for="userPhoneNumber">전화번호</label>
        <input 
          id="userPhoneNumber" 
          type="text" 
          v-model="user.userPhoneNumber" 
          placeholder="전화번호를 입력해주세요" 
          class="mb-1" 
        />

        <label for="userPw">비밀번호</label>
        <input 
          id="userPw" 
          type="password" 
          v-model="user.userPw" 
          placeholder="비밀번호를 입력해주세요" 
          class="mb-1" 
        />

        <label for="confirmPassword">비밀번호 확인</label>
        <input 
          id="confirmPassword" 
          type="password" 
          v-model="user.confirmPassword" 
          placeholder="비밀번호를 다시 입력해주세요" 
          class="mb-1" 
        />

      <button @click="register" class="register-btn">가입하기</button>

      <div v-if="errorMessage" class="error">
        <span class="error-icon">!</span> {{ errorMessage }}
      </div>

      <div v-if="successMessage" class="success">
        <span class="success-icon">✓</span> {{ successMessage }}
      </div>

      <div class="login-link">
        이미 계정이 있으신가요?
        <a href="#" @click.prevent="goToLogin">로그인</a>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import Axios from 'axios';

const router = useRouter();

const user = ref({
  userId: '',
  userPw: '',
  userName: '',
  userNickname: '',
  userPhoneNumber: '',
  confirmPassword: ''
});

const errorMessage = ref('');
const successMessage = ref('');

const register = async () => {
  // 모든 필드가 입력 되었는지 확인
  if (Object.values(user.value).some(value => !value)) {
    errorMessage.value = '모든 필드를 입력해주세요';
    return;
  }

  // 비밀번호와 비밀번호 확인이 일치하는지 확인
  if (user.value.userPw !== user.value.confirmPassword) {
    errorMessage.value = "비밀번호가 일치하지 않습니다.";
    return;
  }

  // api 호출하기
  const url = '/api/users'
  const requestBody = {
    userId: user.value.userId,
    password: user.value.userPw,
    userName: user.value.userName,
    nickname: user.value.userNickname,
    phoneNumber: user.value.userPhoneNumber
  };

  try {
    const response = await Axios.post(url, requestBody)
    
    // 회원가입 성공 시 successMessage 출력
    if (response.status === 201) {
      successMessage.value = "회원가입이 성공했습니다! 로그인 페이지로 이동합니다.";
      errorMessage.value = '';
      setInit();
      
      // 1초 뒤에 로그인 페이지로 이동
      setTimeout(() => {
        router.push('/daeun');  // 로그인 페이지로 이동
      }, 1000);  // 1초 뒤에 실행
    } else {
      errorMessage.value = '회원가입 실패. 알 수 없는 상태'
    }
  } catch (error) {
    console.error("회원가입 실패 원인:", error);  // 에러 로그 출력
    errorMessage.value = '회원 가입 실패! 잠시 후 다시 시도해주세요';
  }

  // 모든 필드 빈값으로 만들기
  setInit();
};

// 초기화 함수
const setInit = () => {
  // 초기화 작업 (예: 입력 필드 값 초기화)
  user.value = {
    userId: '',
    userPw: '',
    userName: '',
    userNickname: '',
    userPhoneNumber: '',
    confirmPassword: ''
  };
};

const goToLogin = () => {
  router.push('/daeun');
};
</script>

<style scoped>
.signup-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: linear-gradient(135deg, #f5f7fa 0%, #e4e8f0 100%);
  padding: 20px;
}

.signup-box {
  display: flex;
  flex-direction: column;
  width: 400px;
  background-color: white;
  border-radius: 12px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
  padding: 30px;
  position: relative;
  overflow: hidden;
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

.welcome-text {
  color: #7f8c8d;
  text-align: center;
  margin-bottom: 25px;
  font-size: 14px;
}

label {
  font-size: 13px;
  margin-bottom: 5px;
  color: #4a5568;
  font-weight: 500;
  text-align: left;
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

.register-btn {
  margin-top: 10px;
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

.register-btn:hover {
  background: linear-gradient(135deg, #3273dc 0%, #2563eb 100%);
  transform: translateY(-2px);
  box-shadow: 0 6px 8px rgba(50, 115, 220, 0.3);
}

.error, .success {
  margin-top: 20px;
  padding: 12px;
  border-radius: 8px;
  font-size: 14px;
  display: flex;
  align-items: center;
}

.error {
  background-color: #fff5f5;
  color: #e53e3e;
  border-left: 4px solid #e53e3e;
}

.success {
  background-color: #f0fff4;
  color: #38a169;
  border-left: 4px solid #38a169;
}

.error-icon, .success-icon {
  display: inline-flex;
  justify-content: center;
  align-items: center;
  width: 22px;
  height: 22px;
  border-radius: 50%;
  margin-right: 10px;
  font-weight: bold;
}

.error-icon {
  background-color: #e53e3e;
  color: white;
}

.success-icon {
  background-color: #38a169;
  color: white;
}

.login-link {
  margin-top: 20px;
  text-align: center;
  color: #4a5568;
  font-size: 14px;
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

@media (max-width: 480px) {
  .signup-box {
    width: 100%;
    padding: 20px;
  }
}
</style>
