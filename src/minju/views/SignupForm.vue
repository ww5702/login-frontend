<script setup>
import "../PurpleTone.css";

import { ref } from "vue";
import { useRouter } from "vue-router";
import axios from "axios";

const router = useRouter();

// 회원가입 데이터
const registerData = ref({
  userId: "",
  userName: "",
  nickname: "",
  password: "",
  phoneNumber: "",
});

// 회원가입 : 회원 추가
const handleRegister = async () => {
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
    console.error("회원가입 실패: ", error.response?.data || error.message);
    alert("회원가입에 실패했습니다. 다시 시도해주세요.");
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
        placeholder="아이디를 입력하세요"
      />
    </div>
    <div class="form-group">
      <label for="name">이름</label>
      <input
        type="text"
        id="name"
        v-model="registerData.userName"
        placeholder="이름을 입력하세요"
      />
    </div>
    <div class="form-group">
      <label for="nickname">닉네임</label>
      <input
        type="text"
        id="nickname"
        v-model="registerData.nickname"
        placeholder="닉네임을 입력하세요"
      />
    </div>
    <div class="form-group">
      <label for="regPassword">비밀번호</label>
      <input
        type="password"
        id="regPassword"
        v-model="registerData.password"
        placeholder="비밀번호를 입력하세요"
      />
    </div>
    <div class="form-group">
      <label for="phone">전화번호</label>
      <input
        type="tel"
        id="phone"
        v-model="registerData.phoneNumber"
        placeholder="전화번호를 입력하세요"
      />
    </div>
    <div class="form-buttons">
      <button class="btn-primary" @click="handleRegister">회원가입</button>
      <button class="btn-secondary" @click="goHome">돌아가기</button>
    </div>
  </div>
</template>
