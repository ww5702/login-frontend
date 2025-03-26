<template>
  <div class="celebration-container">
    <div class="congrats-text" :class="{ 'show': showCongrats }">
      로그인을 축하합니다! 🎉
    </div>
    <button class="celebration-button" @click="celebrate">로그인을 축하합니다</button>
    
    <!-- New Return to Login Button -->
    <button 
      v-if="showReturnButton" 
      class="return-button" 
      @click="returnToLogin"
    >
      로그인으로 돌아가기
    </button>
    
    <div v-for="(firework, fIndex) in fireworks" :key="'fw-' + fIndex" class="firework">
      <div 
        v-for="(particle, pIndex) in firework.particles" 
        :key="'p-' + fIndex + '-' + pIndex" 
        class="particle"
        :style="particle.style">
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import confetti from 'canvas-confetti';
import { useRouter } from 'vue-router';

const fireworks = ref([]);
const showCongrats = ref(false);
const showReturnButton = ref(false);
const fireworkCount = ref(0);
const router = useRouter();

function launchFireworks() {
  // 화면 전체에 랜덤하게 폭죽 발사
  for (let i = 0; i < 15; i++) {
    setTimeout(() => {
      const x = Math.random() * window.innerWidth;
      const y = Math.random() * (window.innerHeight * 0.8);
      createFirework(x, y);
    }, i * 200);
  }
}

function createFirework(x, y) {
  const colors = ['#FF5252', '#FFD740', '#64FFDA', '#448AFF', '#E040FB', '#69F0AE', '#FFEB3B', '#FF9800'];
  const particles = [];
  const fwId = fireworkCount.value++;
  
  // 각 폭죽마다 여러 입자 생성
  for (let i = 0; i < 40; i++) {
    const angle = Math.random() * Math.PI * 2;
    const distance = Math.random() * 100 + 50;
    const duration = Math.random() * 1 + 0.5;
    const size = Math.random() * 8 + 4;
    const color = colors[Math.floor(Math.random() * colors.length)];
    
    const endX = x + Math.cos(angle) * distance;
    const endY = y + Math.sin(angle) * distance;
    
    particles.push({
      style: {
        left: endX + 'px',
        top: endY + 'px',
        width: size + 'px',
        height: size + 'px',
        backgroundColor: color,
        animation: `fadeOut ${duration}s ease-out forwards`
      }
    });
  }
  
  fireworks.value.push({
    id: fwId,
    particles
  });
  
  // 2초 후에 폭죽 제거
  setTimeout(() => {
    const index = fireworks.value.findIndex(fw => fw.id === fwId);
    if (index !== -1) {
      fireworks.value.splice(index, 1);
    }
  }, 2000);
}

function returnToLogin() {
  router.push('/daeun')
  alert('로그인 페이지로 이동합니다.');

}

function celebrate() {
  // 컨페티 효과
  const duration = 5 * 1000;
  const animationEnd = Date.now() + duration;
  const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };
  
  function randomInRange(min, max) {
    return Math.random() * (max - min) + min;
  }
  
  const interval = setInterval(function() {
    const timeLeft = animationEnd - Date.now();
    
    if (timeLeft <= 0) {
      return clearInterval(interval);
    }
    
    const particleCount = 50 * (timeLeft / duration);
    
    // 왼쪽에서 컨페티
    confetti(Object.assign({}, defaults, { 
      particleCount, 
      origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } 
    }));
    
    // 오른쪽에서 컨페티
    confetti(Object.assign({}, defaults, { 
      particleCount, 
      origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } 
    }));
  }, 250);
  
  // 폭죽 효과 시작
  launchFireworks();
  
  // 버튼 주변에도 폭죽 발사
  setTimeout(() => {
    const buttonRect = document.querySelector('.celebration-button').getBoundingClientRect();
    const buttonX = buttonRect.left + buttonRect.width / 2;
    const buttonY = buttonRect.top;
    
    for (let i = 0; i < 5; i++) {
      setTimeout(() => {
        createFirework(buttonX, buttonY);
      }, i * 300);
    }
  }, 500);
  
  // 축하 텍스트 표시
  showCongrats.value = true;
  
  // 3초 후 초기화 및 돌아가기 버튼 표시
  setTimeout(() => {
    showCongrats.value = false;
    showReturnButton.value = true;
  }, 3000);
}
</script>

<style scoped>
.celebration-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100%;
  position: relative;
  background: linear-gradient(135deg, #ffd0f9 0%, #84b7ff 100%);
  overflow: hidden;
}

.celebration-button, .return-button {
  padding: 16px 32px;
  font-size: 24px;
  font-weight: bold;
  color: #fff;
  border: none;
  border-radius: 50px;
  cursor: pointer;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
  transition: all 0.3s ease;
  position: relative;
  z-index: 10;
  margin: 0 10px;
}

.celebration-button {
  background: linear-gradient(45deg, #ff416c, #ff4b2b);
}

.return-button {
  background: linear-gradient(45deg, #4CAF50, #45a049);
}

.celebration-button:hover, .return-button:hover {
  transform: translateY(-5px);
  box-shadow: 0 15px 25px rgba(0, 0, 0, 0.3);
}

.celebration-button:active, .return-button:active {
  transform: translateY(0);
}

/* 기존 스타일 유지 */
.congrats-text {
  position: absolute;
  top: 25%;
  left: 50%;
  transform: translateX(-50%);
  font-size: 48px;
  font-weight: bold;
  color: #fff;
  text-shadow: 0 0 10px rgba(255, 255, 255, 0.7);
  opacity: 0;
  transition: opacity 0.5s ease;
  z-index: 10;
  text-align: center;
}

.congrats-text.show {
  opacity: 1;
}

.firework {
  position: absolute;
  pointer-events: none;
  z-index: 5;
}

.particle {
  position: absolute;
  border-radius: 50%;
  transform: translate(-50%, -50%);
  pointer-events: none;
}

@keyframes fadeOut {
  0% {
    transform: translate(-50%, -50%) scale(0);
    opacity: 1;
  }
  100% {
    transform: translate(-50%, -50%) scale(1);
    opacity: 0;
  }
}
</style>