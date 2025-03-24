<script setup>
import "../PurpleTone.css";

import { ref } from "vue";
import { useRouter } from "vue-router";
import axios from "axios";

const router = useRouter();

// 회원가입 필드의 오류 여부 저장
const fieldErrors = ref({
  userId: false,
  userName: false,
  nickname: false,
  password: false,
  phoneNumber: false,
});

// 회원가입 데이터
const registerData = ref({
  userId: "",
  userName: "",
  nickname: "",
  password: "",
  phoneNumber: "",
});

//회원가입 데이터 입력 필드 유효성 검사
const checkEmptyField = (registerData) => {
  if (!registerData.value.userId) {
    fieldErrors.value.userId = true;
    return false;
  }
  if (!registerData.value.userName) {
    fieldErrors.value.userName = true;
    return false;
  }
  if (!registerData.value.nickname) {
    fieldErrors.value.nickname = true;
    return false;
  }
  if (!registerData.value.password) {
    fieldErrors.value.password = true;
    return false;
  }
  if (!registerData.value.phoneNumber) {
    fieldErrors.value.phoneNumber = true;
    return false;
  }
  return true;
};

// 비밀번호 복잡도 검사
const isValidPassword = (password) => {
  const regex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*()_+=-]).{8,}$/;
  return regex.test(password);
};

// 전화번호 유효성 검사
const isValidPhoneNumber = (phoneNumber) => {
  const regex = /^010\d{8}$/;
  return regex.test(phoneNumber);
};

// 회원가입 : 회원 추가
const handleSignup = async () => {
  // 모든 필드 에러 상태 초기화
  Object.keys(fieldErrors.value).forEach((key) => {
    fieldErrors.value[key] = false;
  });

  //회원가입 데이터 유효성 검사
  if (!checkEmptyField(registerData)) {
    alert("모든 필드를 입력해 주세요.");
    return;
  }

  if (!isValidPassword(registerData.value.password)) {
    alert("비밀번호는 8자 이상, 영문/숫자/특수문자를 포함해야 합니다.");
    fieldErrors.value.password = true;
    return;
  }

  if (!isValidPhoneNumber(registerData.value.phoneNumber)) {
    alert("핸드폰 번호는 하이픈(-)없이 11자리 숫자로 입력해 주세요.");
    fieldErrors.value.phoneNumber = true;
    return;
  }

  const requestBody = {
    //ref 객체(registerData) 안의 속성에 접근해야 함
    userId: registerData.value.userId,
    userName: registerData.value.userName,
    nickname: registerData.value.nickname,
    password: registerData.value.password,
    phoneNumber: registerData.value.phoneNumber,
  };

  try {
    const response = await axios.post("/api/users", requestBody);

    if (response.status == 201) {
      console.log("회원가입 성공", response.data);
      router.push("/minju");
    }
  } catch (error) {
    console.log(error);
    if (error.response.status == 500) {
      console.error("회원가입 실패: ", error.response?.data || error.message);
      alert("회원가입에 실패했습니다. 다시 시도해주세요.");
    }
  }
};

//홈으로 돌아가기
const goHome = () => {
  router.push("/minju");
};
</script>

<template>
  <div class="form-content">
    <div class="form-group">
      <label for="regUserId">아이디</label>
      <input
        type="text"
        id="regUserId"
        v-model="registerData.userId"
        :class="{ 'input-error': fieldErrors.userId }"
        placeholder="아이디를 입력하세요"
      />
      <span v-if="fieldErrors.userId" class="error-message"
        >아이디를 입력해주세요</span
      >
    </div>
    <div class="form-group">
      <label for="name">이름</label>
      <input
        type="text"
        id="name"
        v-model="registerData.userName"
        :class="{ 'input-error': fieldErrors.userName }"
        placeholder="이름을 입력하세요"
      />
      <span v-if="fieldErrors.userName" class="error-message"
        >이름을 입력해주세요</span
      >
    </div>
    <div class="form-group">
      <label for="nickname">닉네임</label>
      <input
        type="text"
        id="nickname"
        v-model="registerData.nickname"
        :class="{ 'input-error': fieldErrors.nickname }"
        placeholder="닉네임을 입력하세요"
      />
      <span v-if="fieldErrors.nickname" class="error-message"
        >닉네임을 입력해주세요</span
      >
    </div>
    <div class="form-group">
      <label for="regPassword">비밀번호</label>
      <input
        type="password"
        id="regPassword"
        v-model="registerData.password"
        :class="{ 'input-error': fieldErrors.password }"
        placeholder="비밀번호를 입력하세요"
      />
      <span v-if="fieldErrors.password" class="error-message"
        >비밀번호는 8자 이상, 영문/숫자/특수문자를 포함해야 합니다</span
      >
    </div>
    <div class="form-group">
      <label for="phone">전화번호</label>
      <input
        type="tel"
        id="phone"
        v-model="registerData.phoneNumber"
        :class="{ 'input-error': fieldErrors.phoneNumber }"
        placeholder="전화번호를 입력하세요"
      />
      <span v-if="fieldErrors.phoneNumber" class="error-message"
        >올바른 전화번호 형식이 아닙니다</span
      >
    </div>
    <div class="form-buttons">
      <button class="btn-primary" @click="handleSignup">회원가입</button>
      <button class="btn-secondary" @click="goHome">돌아가기</button>
    </div>
  </div>
</template>

<style>
.form-group {
  position: relative;
  margin-bottom: 1rem;
}

.input-error {
  border: 2px solid #ff4444;
  background-color: #fff8f8;
  transition: all 0.3s ease;
}

.input-error:hover {
  border-color: #ff0000;
  box-shadow: 0 0 5px rgba(255, 0, 0, 0.2);
}

.error-message {
  color: #ff4444;
  font-size: 0.8rem;
  margin-top: 0.25rem;
  display: block;
}

input {
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  transition: all 0.3s ease;
}

input:focus {
  outline: none;
  border-color: #4a90e2;
  box-shadow: 0 0 5px rgba(74, 144, 226, 0.2);
}
</style>
