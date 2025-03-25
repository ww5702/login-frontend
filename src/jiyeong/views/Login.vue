<script setup>
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import axios from "axios";

// 라우터 인스턴스 가져오기
const router = useRouter()

// 반응형 상태 정의
const isNewPlayer = ref(false);
const username = ref('')
const password = ref('')
const rememberMe = ref(false)
const showPassword = ref(false)
const isLoading = ref(false)
const message = ref('')
const isError = ref(false)
const validationErrors = reactive({})

// 폼 유효성 검사
const validateForm = () => {
  Object.keys(validationErrors).forEach(key => delete validationErrors[key])
  let isValid = true // 폼이 유효하다고 가정하고 시작 

  // 사용자가 아이디를 입력하지 않거나, 공백이라면 
  if (!username.value.trim()) {
    validationErrors.username = '아이디를 입력해주세요'
    isValid = false
  }

  // 사용자가 비밀번호를 입력하지 않았거나, 공백이라면 
  if (!password.value) {
    validationErrors.password = '비밀번호를 입력해주세요'
    isValid = false

    // 사용자가 비밀번호를 8자 미만으로 쳤다면 
  } else if (password.value.length < 8) {
    validationErrors.password = '비밀번호는 최소 8자 이상이어야 합니다'
    isValid = false
  }

  return isValid
}

// 로그인 처리
const handleLogin = async (event) => {

  // 폼이 제출될 때 새로고침 방지 
  if (event) event.preventDefault();

  if (!validateForm()) {
    return // 유효성 검사 실패하면 즉시 종료 
  }

  isLoading.value = true
  message.value = ''

  try {
    const url = '/api/users/login'
    const requestBody = {
      userId: username.value,
      password: password.value
    }

    // GET 대신 POST 메소드 사용
    const response = await axios.post(url, requestBody);

    // 로그인 성공 처리
    if (response.status === 200 || response.status === 201) {
      // message.value = '로그인 성공! 리디렉션 중...'
      message.value = "로그인 성공!"
      isError.value = false

      // 로그인 성공 후 로컬 스토리지에 사용자 정보 저장 (예시)
      if (rememberMe.value) {
        localStorage.setItem('user', JSON.stringify({
          username: username.value,
          token: response.data.token // API 응답에서 토큰 가져오기
        }))
      }

      // 메인 페이지로 리디렉션
      // setTimeout(() => {
      //   router.push('/dashboard')
      // }, 1500)

    } else {
      message.value = '아이디 또는 비밀번호가 올바르지 않습니다.'
      isError.value = true
    }
  } catch (error) {
    console.error('로그인 중 오류 발생:', error)
    message.value = '로그인 중 오류가 발생했습니다. 나중에 다시 시도해주세요.'
    isError.value = true
  } finally {
    isLoading.value = false
  }
}

// 회원가입 페이지로 이동
const redirectToRegister = () => {
  router.push('/jiyeong/signup')
}

// 소셜 로그인
const socialLogin = (provider) => {
  console.log(`${provider} 로그인 시도`)
  // 실제 소셜 로그인 구현
  // OAuth 플로우 시작
}
</script>

<template>
  <div class="container">
    <!-- Bootstrap Icons CSS -->
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.0/font/bootstrap-icons.css">

    <div class="login-container">
      <div class="login-logo">
        <img src="./logo.jpeg" alt="Logo">
      </div>
      <h3 class="text-center mb-4">로그인</h3>

      <div v-if="message" :class="'alert alert-' + (isError ? 'danger' : 'success')">
        {{ message }}
      </div>

      <form @submit.prevent="handleLogin">
        <div class="form-group">
          <label for="username" class="form-label">아이디</label>
          <input type="text" class="form-control" id="username" v-model="username" placeholder="아이디를 입력하세요"
            :class="{ 'is-invalid': validationErrors.username }" required>
          <div class="invalid-feedback" v-if="validationErrors.username">
            {{ validationErrors.username }}
          </div>
        </div>

        <div class="form-group">
          <label for="password" class="form-label">비밀번호</label>
          <div class="input-group">
            <input :type="showPassword ? 'text' : 'password'" class="form-control" id="password" v-model="password"
              placeholder="비밀번호를 입력하세요" :class="{ 'is-invalid': validationErrors.password }" required>
            <button class="btn btn-outline-secondary" type="button" @click="showPassword = !showPassword"
              title="{{ showPassword ? '비밀번호 숨기기' : '비밀번호 보기' }}">
              <i :class="showPassword ? 'bi bi-eye-slash' : 'bi bi-eye'"></i>
            </button>
            <div class="invalid-feedback" v-if="validationErrors.password">
              {{ validationErrors.password }}
            </div>
          </div>
        </div>

        <div class="d-flex justify-content-between mb-3">
          <div class="form-check">
            <input type="checkbox" class="form-check-input" id="remember" v-model="rememberMe">
            <label class="form-check-label" for="remember">로그인 상태 유지</label>
          </div>
          <div>
            <router-link to="/forgot-password" class="text-decoration-none">비밀번호 찾기</router-link>
          </div>
        </div>

        <div class="d-grid gap-2">
          <button type="submit" class="btn btn-primary" :disabled="isLoading">
            <span v-if="isLoading" class="spinner-border spinner-border-sm me-2" role="status"
              aria-hidden="true"></span>
            {{ isLoading ? '로그인 중...' : '로그인' }}
          </button>
          <button type="button" class="btn btn-outline-primary" @click="redirectToRegister">회원가입</button>
        </div>

        <div class="mt-4">
          <div class="divider">
            <span>또는</span>
          </div>
          <div class="d-flex justify-content-center gap-3 mt-3">
            <button type="button" class="btn btn-outline-dark" @click="socialLogin('google')">
              Google
            </button>
            <button type="button" class="btn btn-outline-info" @click="socialLogin('Facebook')">
              Facebook
            </button>
            <button type="button" class="btn btn-outline-warning" @click="socialLogin('Kakao')">
              Kakao
            </button>
            <button type="button" class="btn btn-outline-success" @click="socialLogin('naver')">
              Naver
            </button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<style scoped>
.login-container {
  max-width: 28rem;
  margin: 6.25rem auto;
  padding: 2rem;
  border-radius: 0.7rem;
  box-shadow: 0 0 0.625rem rgba(0, 0, 0, 0.1);
  background-color: #f8f9fa;
  /* 배경색 추가 - 연한 회색 */
}

.login-logo {
  text-align: center;
  margin-bottom: 1.25rem;
}

.login-logo img {
  height: 8rem;
  width: 8rem;
  border-radius: 50%;
  /* 원형으로 만들기 */
  object-fit: cover;
  /* 이미지 비율 유지하면서 영역 채우기 */
  border: 1px solid #dee2e6;
  /* 선택적: 테두리 추가 */
  transition: all 0.3s ease;
  /* 부드러운 변화 효과 */
  cursor: pointer;
  /* 커서를 포인터로 변경 */
}

.login-logo img:hover {
  transform: scale(1.05);
  /* 살짝 확대 */
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  /* 그림자 효과 */
}

.form-group {
  margin-bottom: 0.9375rem;
}

.alert {
  margin-top: 1.25rem;
}

/* 추가된 가로선 & 또는 스타일 */
.divider {
  display: flex;
  align-items: center;
  text-align: center;
  margin: 1rem 0;
}

.divider::before,
.divider::after {
  content: "";
  flex: 1;
  border-bottom: 1px solid #dee2e6;
}

.divider span {
  padding: 0 1rem;
  color: #6c757d;
  font-size: 0.9rem;
}

.btn-primary:hover {
  transform: translateX(0);
}
</style>