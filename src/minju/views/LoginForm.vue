<script setup>
import "../PurpleTone.css";

import { ref } from "vue";
import { useRouter } from "vue-router";
import axios from "axios";

const router = useRouter();

// 로그인 데이터
const loginData = ref({
  userId: "",
  password: "",
});

const handleLogin = async () => {
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
        console.log("로그인 실패", response.data);
        alert("로그인 실패 😭😭😭");
      }
    }
  } catch (error) {
    console.error("로그인 실패: ", error.response?.data || error.message);
    alert("서버 에러입니다.");
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
        placeholder="아이디를 입력하세요"
      />
    </div>
    <div class="form-group">
      <label for="password">비밀번호</label>
      <input
        type="password"
        id="password"
        v-model="loginData.password"
        placeholder="비밀번호를 입력하세요"
      />
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
