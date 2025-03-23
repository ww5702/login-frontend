<script>
import { ref } from "vue";
import "../PurpleTone.css"; // CSS 파일 직접 가져오기

export default {
  name: "SignupForm",
  emits: ["changeView"],
  setup(props, { emit }) {
    // 회원가입 데이터
    const registerData = ref({
      userId: "",
      name: "",
      nickname: "",
      password: "",
      phone: "",
    });

    // 회원가입 처리 함수
    const handleRegister = async () => {
      try {
        // API 호출 대신 콘솔에 출력 (실제 구현 시 API 호출로 변경 필요)
        console.log("회원가입 요청:", registerData.value);

        // 실제 API 호출 예시
        // const response = await registerUser(registerData.value);
        // if (response.success) {
        //   // 회원가입 성공 처리
        //   emit('changeView', 'login');
        // }

        alert("회원가입 요청이 전송되었습니다.");
        emit("changeView", "login");
      } catch (error) {
        console.error("회원가입 에러:", error);
        alert("회원가입 중 오류가 발생했습니다.");
      }
    };

    return {
      registerData,
      handleRegister,
    };
  },
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
        v-model="registerData.name"
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
        v-model="registerData.phone"
        placeholder="전화번호를 입력하세요"
      />
    </div>
    <div class="form-buttons">
      <button class="btn-primary" @click="handleRegister">회원가입</button>
      <button class="btn-secondary" @click="$emit('changeView', 'login')">
        돌아가기
      </button>
    </div>
  </div>
</template>
