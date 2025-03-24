<script setup>
import "../css/PurpleTone.css";
import "../css/ValidateForm.css";

import { ref } from "vue";
import { useRouter } from "vue-router";
import axios from "axios";

const router = useRouter();

// 로그인 데이터
const loginData = ref({
  userId: "",
  password: "",
});

// 로그인 필드의 오류 여부를 저장
const fieldErrors = ref({
  userId: false,
  password: false,
});

const checkEmptyField = (loginData) => {
  if (!loginData.value.userId) {
    fieldErrors.value.userId = true;
    return false;
  }
  if (!loginData.value.password) {
    fieldErrors.value.password = true;
    return false;
  }
  return true;
};

// 로그인
const handleLogin = async () => {
  // 모든 필드 에러 상태 초기화
  Object.keys(fieldErrors.value).forEach((key) => {
    fieldErrors.value[key] = false;
  });

  // 로그인 데이터 유효성 검사
  if (!checkEmptyField(loginData)) {
    return;
  }

  const requestBody = {
    userId: loginData.value.userId,
    password: loginData.value.password,
  };

  try {
    const response = await axios.post("/api/users/login", requestBody);

    if (response.status == 200) {
      if (response.data === true) {
        //=== 인가 ==인가??
        console.log("로그인 성공", response.data);
        alert("로그인 성공 🥳🥳🥳");
        router.push("/"); //홈으로 돌아가기
      } else {
        console.log("비밀번호 불일치", response.data);
        alert("비밀번호를 확인해 주세요. 😭😭😭");
      }
    }
  } catch (error) {
    if (
      error.response.data.message == "USER NOT FOUND" ||
      error.response.status == 404
    ) {
      console.error("USER NOT FOUND");
      alert("아이디를 확인해 주세요. 존재하지 않는 회원입니다.");
      return;
    }

    if (error.response.status == 500) {
      console.error("로그인 실패: ", error.response?.data || error.message);
      alert("서버 에러입니다.");
      return;
    }
  }
};

const goSignup = () => {
  router.push("/minju/signup");
};

const goFindPassword = () => {
  router.push("/minju/password");
};
</script>

<template>
  <div class="form-content">
    <div class="form-group">
      <label for="userId">아이디</label>
      <input
        type="text"
        id="userId"
        v-model="loginData.userId"
        :class="{ 'input-error': fieldErrors.userId }"
        placeholder="아이디를 입력하세요"
      />
      <span v-if="fieldErrors.userId" class="error-message"
        >아이디를 입력해주세요</span
      >
    </div>
    <div class="form-group">
      <label for="password">비밀번호</label>
      <input
        type="password"
        id="password"
        v-model="loginData.password"
        :class="{ 'input-error': fieldErrors.password }"
        placeholder="비밀번호를 입력하세요"
      />
      <span v-if="fieldErrors.password" class="error-message"
        >비밀번호를 입력해주세요.</span
      >
    </div>
    <div class="form-buttons">
      <button class="btn-primary" @click="handleLogin">로그인</button>
    </div>
    <div class="form-links">
      <a href="#" @click="goSignup">회원가입</a>
      <a href="#" @click="goFindPassword">비밀번호 찾기</a>
    </div>
  </div>
</template>
