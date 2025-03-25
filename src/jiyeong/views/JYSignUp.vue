<script setup>
import { ref, reactive, watch } from 'vue'
import { useRouter } from 'vue-router'
import axios from "axios";

// 라우터 인스턴스 가져오기
const router = useRouter()

// 반응형 상태 정의
const userId = ref('')
const name = ref('')
const nickname = ref('')
const password = ref('')
const confirmPassword = ref('')
const phone = ref('')
const termsAgreed = ref(false)
const showPassword = ref(false)
const showConfirmPassword = ref(false)
const isLoading = ref(false)
const message = ref('')
const isError = ref(false)
const validationErrors = reactive({})

// 추가 
const isCheckingUserId = ref(false)
const userIdChecked = ref(false)
const userIdAvailable = ref(false)
const userInvaild = ref(false)


// 중복 확인 처리 

const checkUserIdAvailability = async () => {
    // 입력값 검사
    if (!userId.value.trim()) {
        validationErrors.userId = '아이디를 입력해주세요'
        return
    }

    isCheckingUserId.value = true
    userIdChecked.value = false
    userIdAvailable.value = false
    userInvaild.value = false

    try {
        // 아이디 중복 확인을 위한
        // Get 요청으로 특정 사용자 정보를 요청하여 존재 여부 확인
        const response = await axios.get(`/api/users/${userId.value}`)
        console.log(response)

        // 해당 아이디가 이미 존재하는 경우 (200 응답)
        userIdAvailable.value = false
        // message.value = '이미 사용 중인 아이디입니다.'
        userInvaild.value = true
    } catch (error) {
        // 404 에러는 해당 ID가 없다는 의미로 사용 

        userIdAvailable.value = true
        userIdChecked.value = true
        // message.value = '사용 가능한 아이디입니다.'
        // isError.value = false
        // delete validationErrors.userId


        // if (error.response && error.response.status === 404) {
        //     userIdAvailable.value = true
        //     userIdChecked.value = true
        //     message.value = '사용 가능한 아이디입니다.'
        //     isError.value = false
        //     // 유효성 검사 에러 제거
        //     // delete validationErrors.userId

        // } else {
        //     // 기타 서버 오류
        //     message.value = '서버 오류가 발생했습니다. 나중에 다시 시도해주세요.'
        //     isError.value = true
        // }

    } finally {
        isCheckingUserId.value = false
    }
}

// 아이디 입력값이 변경되었을 때 checked 상태 리셋
const resetUserIdCheck = () => {
    userIdChecked.value = false
    userIdAvailable.value = false
    userInvaild.value = false
    message.value = '' // 기존 메시지를 지우려면 주석 해제
}

// userId의 값이 변경될 때마다 중복 체크 상태를 리셋
watch(userId, () => {
    resetUserIdCheck()
})





// 폼 유효성 검사
const validateForm = () => {
    Object.keys(validationErrors).forEach(key => delete validationErrors[key])
    let isValid = true

    if (!userId.value.trim()) {
        validationErrors.userId = '아이디를 입력해주세요'
        isValid = false
    } else if (!userIdChecked.value) {
        validationErrors.userId = '아이디 중복 확인이 필요합니다'
        isValid = false
    } else if (!userIdAvailable.value) {
        validationErrors.userId = '사용할 수 없는 아이디입니다'
        isValid = false
    }

    if (!name.value.trim()) {
        validationErrors.name = '이름을 입력해주세요'
        isValid = false
    }

    if (!nickname.value.trim()) {
        validationErrors.nickname = '닉네임을 입력해주세요'
        isValid = false
    }

    if (!phone.value.trim()) {
        validationErrors.phone = '전화번호를 입력해주세요'
        isValid = false
    } else if (!/^[0-9]{10,11}$/.test(phone.value.replace(/-/g, ''))) {
        validationErrors.phone = '유효한 전화번호를 입력해주세요'
        isValid = false
    }

    if (!password.value) {
        validationErrors.password = '비밀번호를 입력해주세요'
        isValid = false
    } else if (password.value.length < 8) {
        validationErrors.password = '비밀번호는 최소 8자 이상이어야 합니다'
        isValid = false
    }

    if (!confirmPassword.value) {
        validationErrors.confirmPassword = '비밀번호 확인을 입력해주세요'
        isValid = false
    } else if (password.value !== confirmPassword.value) {
        validationErrors.confirmPassword = '비밀번호가 일치하지 않습니다'
        isValid = false
    }

    if (!termsAgreed.value) {
        validationErrors.termsAgreed = '이용약관에 동의해주세요'
        isValid = false
    }

    return isValid
}


// 회원가입 처리
const handleRegister = async () => {
    if (!validateForm()) {
        return // 유효성 검사 실패하면 즉시 종료 
    }

    isLoading.value = true
    message.value = ''

    try {
        const url = '/api/users'
        const requestBody = {
            userId: userId.value,
            userName: name.value,
            nickname: nickname.value,
            password: password.value,
            phoneNumber: phone.value
        }

        // API 호출을 시뮬레이션합니다.
        // 실제 상황에서는 아래 주석을 해제하고 API 호출을 수행합니다.
        const response = await axios.post(url, requestBody)

        // 시뮬레이션을 위한 임시 코드
        // await new Promise(resolve => setTimeout(resolve, 1500))
        // const response = { result: 'SUCCESS' }

        // if (response.result === apiCall.Response.SUCCESS) {
        if (response.status === 200 || response.status === 201) {
            message.value = '회원가입이 완료되었습니다. 로그인 페이지로 이동합니다.'
            isError.value = false

            // 성공 후 로그인 페이지로 리디렉션
            setTimeout(() => {
                router.push('/jiyeong')
            }, 1500)
        } else {
            message.value = '회원가입 중 오류가 발생했습니다.'
            isError.value = true
        }
    } catch (error) {
        console.error('회원가입 중 오류 발생:', error)
        message.value = '회원가입 중 오류가 발생했습니다. 나중에 다시 시도해주세요.'
        isError.value = true
    } finally {
        isLoading.value = false
    }
}


// 로그인 페이지로 이동
const redirectToLogin = () => {
    router.push('/jiyeong')
}
</script>

<template>
    <div class="container">
        <!-- Bootstrap Icons CSS -->
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.0/font/bootstrap-icons.css">

        <div class="register-container">
            <div class="register-logo">
                <img src="./logo.jpeg" alt="Logo">
            </div>
            <h3 class="text-center mb-4">회원가입</h3>

            <div v-if="message" :class="'alert alert-' + (isError ? 'danger' : 'success')">
                {{ message }}
            </div>

            <form @submit.prevent="handleRegister">
                <div class="form-group">
                    <label for="userId" class="form-label">아이디</label>

                    <div class="input-group">
                        <input type="text" class="form-control" id="userId" v-model="userId" placeholder="아이디를 입력하세요"
                            :class="{
                                'is-invalid': validationErrors.userId || userInvaild,
                                'is-valid': userIdChecked && userIdAvailable
                            }" @input="resetUserIdCheck" required>
                        <button class="btn btn-sm btn-outline-secondary" type="button" @click="checkUserIdAvailability"
                            :disabled="isCheckingUserId || !userId.trim()">
                            <span v-if="isCheckingUserId" class="spinner-border spinner-border-sm" role="status"
                                aria-hidden="true"></span>
                            {{ isCheckingUserId ? '확인 중...' : '중복 확인' }}
                        </button>

                        <div class="invalid-feedback" v-if="validationErrors.userId">
                            {{ validationErrors.userId }}
                        </div>

                        <div class="valid-feedback" v-if="userIdAvailable">
                            사용 가능한 아이디입니다.
                        </div>

                        <div class="invalid-feedback" v-if="userInvaild">
                            이미 사용 중인 아이디입니다.
                        </div>


                    </div>
                </div>

                <div class="form-group">
                    <label for="name" class="form-label">이름</label>
                    <input type="text" class="form-control" id="name" v-model="name" placeholder="이름을 입력하세요"
                        :class="{ 'is-invalid': validationErrors.name }" required>
                    <div class="invalid-feedback" v-if="validationErrors.name">
                        {{ validationErrors.name }}
                    </div>
                </div>

                <div class="form-group">
                    <label for="nickname" class="form-label">닉네임</label>
                    <input type="text" class="form-control" id="nickname" v-model="nickname" placeholder="닉네임을 입력하세요"
                        :class="{ 'is-invalid': validationErrors.nickname }" required>
                    <div class="invalid-feedback" v-if="validationErrors.nickname">
                        {{ validationErrors.nickname }}
                    </div>
                </div>

                <div class="form-group">
                    <label for="phone" class="form-label">전화번호</label>
                    <input type="tel" class="form-control" id="phone" v-model="phone" placeholder="전화번호를 입력하세요"
                        :class="{ 'is-invalid': validationErrors.phone }" required>
                    <div class="invalid-feedback" v-if="validationErrors.phone">
                        {{ validationErrors.phone }}
                    </div>
                </div>

                <div class="form-group">
                    <label for="password" class="form-label">비밀번호</label>
                    <div class="input-group">
                        <input :type="showPassword ? 'text' : 'password'" class="form-control" id="password"
                            v-model="password" placeholder="비밀번호를 입력하세요"
                            :class="{ 'is-invalid': validationErrors.password }" required>
                        <button class="btn btn-outline-secondary" type="button" @click="showPassword = !showPassword"
                            :title="showPassword ? '비밀번호 숨기기' : '비밀번호 보기'">
                            <i :class="showPassword ? 'bi bi-eye-slash' : 'bi bi-eye'"></i>
                        </button>
                        <div class="invalid-feedback" v-if="validationErrors.password">
                            {{ validationErrors.password }}
                        </div>
                    </div>
                    <small class="text-muted">비밀번호는 최소 8자 이상이어야 합니다.</small>
                </div>

                <div class="form-group">
                    <label for="confirmPassword" class="form-label">비밀번호 확인</label>
                    <div class="input-group">
                        <input :type="showConfirmPassword ? 'text' : 'password'" class="form-control"
                            id="confirmPassword" v-model="confirmPassword" placeholder="비밀번호를 다시 입력하세요"
                            :class="{ 'is-invalid': validationErrors.confirmPassword }" required>
                        <button class="btn btn-outline-secondary" type="button"
                            @click="showConfirmPassword = !showConfirmPassword"
                            :title="showConfirmPassword ? '비밀번호 숨기기' : '비밀번호 보기'">
                            <i :class="showConfirmPassword ? 'bi bi-eye-slash' : 'bi bi-eye'"></i>
                        </button>
                        <div class="invalid-feedback" v-if="validationErrors.confirmPassword">
                            {{ validationErrors.confirmPassword }}
                        </div>
                    </div>
                </div>

                <div class="form-check">
                    <input type="checkbox" class="form-check-input" id="termsAgreed" v-model="termsAgreed"
                        :class="{ 'is-invalid': validationErrors.termsAgreed }">
                    <label class="form-check-label" for="termsAgreed">
                        이용약관 및 개인정보 처리방침에 동의합니다.
                    </label>
                    <div class="invalid-feedback" v-if="validationErrors.termsAgreed">
                        {{ validationErrors.termsAgreed }}
                    </div>
                </div>

                <!-- <div class="mt-3 text-center">
                    <a href="#" class="text-decoration-none">약관 보기</a>
                </div> -->

                <div class="d-grid gap-2 mt-4">
                    <button type="submit" class="btn btn-primary" :disabled="isLoading">
                        <span v-if="isLoading" class="spinner-border spinner-border-sm me-2" role="status"
                            aria-hidden="true"></span>
                        {{ isLoading ? '처리 중...' : '회원가입' }}
                    </button>
                    <button type="button" class="btn btn-outline-primary" @click="redirectToLogin">로그인 페이지로
                        돌아가기</button>
                </div>
            </form>
        </div>
    </div>
</template>

<style scoped>
.register-container {
    max-width: 28rem;
    margin: 6.25rem auto;
    padding: 2rem;
    border-radius: 0.7rem;
    box-shadow: 0 0 0.625rem rgba(0, 0, 0, 0.1);
    background-color: #f8f9fa;
}

.register-logo {
    text-align: center;
    margin-bottom: 1.25rem;
}

.register-logo img {
    height: 8rem;
    width: 8rem;
    border-radius: 50%;
    object-fit: cover;
    border: 1px solid #dee2e6;
    transition: all 0.3s ease;
    cursor: pointer;
}

.register-logo img:hover {
    transform: scale(1.05);
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
}

.form-group {
    margin-bottom: 0.9375rem;
}

.alert {
    margin-top: 1.25rem;
}

.btn-primary:hover {
    transform: translateX(0);
    ;
}


/* input-group 내의 버튼 스타일 수정 */
.input-group .btn {
    border-top-right-radius: 0.375rem !important;
    border-bottom-right-radius: 0.375rem !important;
    z-index: 5;
}

</style>