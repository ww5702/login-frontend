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
      <a href="#" @click.prevent="$emit('changeView', 'signup')">회원가입</a>
      <a href="#" @click.prevent="$emit('changeView', 'recovery')"
        >비밀번호 찾기</a
      >
    </div>
  </div>
</template>

<script>
import "../PurpleTone.css";
import { ref } from "vue";

export default {
  name: "LoginForm",
  emits: ["changeView"],
  setup(props, { emit }) {
    // 로그인 데이터
    const loginData = ref({
      userId: "",
      password: "",
    });

    // 로그인 처리 함수 (폼이 아닌 함수 방식으로 데이터 처리)
    const handleLogin = async () => {
      try {
        // API 호출 대신 콘솔에 출력 (실제 구현 시 API 호출로 변경 필요)
        console.log("로그인 요청:", loginData.value);

        // 실제 API 호출 예시
        // const response = await loginUser(loginData.value);
        // if (response.success) {
        //   // 로그인 성공 처리
        // }

        alert("로그인 요청이 전송되었습니다.");
      } catch (error) {
        console.error("로그인 에러:", error);
        alert("로그인 중 오류가 발생했습니다.");
      }
    };

    return {
      loginData,
      handleLogin,
    };
  },
};
</script>
