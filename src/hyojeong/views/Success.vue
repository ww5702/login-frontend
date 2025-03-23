<template>
    <div class="login-success">
      <div class="success-container">
        <div class="success-icon">✓</div>
        <h1>로그인 성공!</h1>
        <p>환영합니다! 성공적으로 로그인되었습니다.</p>
        
        <button class="btn" @click="goToMain">메인 페이지로</button>
      </div>
      
      <!-- 폭죽 효과를 위한 캔버스 -->
      <canvas ref="fireworksCanvas" class="fireworks-canvas"></canvas>
    </div>
  </template>
  
  <script>
  export default {
    name: 'LoginSuccess',
    data() {
      return {
        username: '김철수',
        lastLogin: this.formatDate(new Date()),
        fireworks: [],
        animationFrameId: null,
        canvas: null,
        ctx: null
      }
    },
    mounted() {
      // 폭죽 효과 초기화
      this.initFireworks();
      
      // 컴포넌트가 마운트되면 폭죽 애니메이션 시작
      this.startFireworks();
    },
    beforeUnmount() {
      // 컴포넌트가 언마운트되기 전에 애니메이션 정리
      this.stopFireworks();
    },
    methods: {
      formatDate(date) {
        return `${date.getFullYear()}년 ${date.getMonth() + 1}월 ${date.getDate()}일 ${date.getHours()}:${date.getMinutes()}`;
      },
      goToMain() {
        this.$router.push('/hyojeong');
      },
      initFireworks() {
        // 캔버스 설정
        this.canvas = this.$refs.fireworksCanvas;
        this.ctx = this.canvas.getContext('2d');
        
        // 캔버스 크기 설정
        this.resizeCanvas();
        
        // 윈도우 크기가 변경될 때 캔버스 크기도 조정
        window.addEventListener('resize', this.resizeCanvas);
        
        // 폭죽 자동 생성 (초기 폭죽 5개)
        for (let i = 0; i < 5; i++) {
          setTimeout(() => {
            this.createFirework();
          }, i * 300);
        }
      },
      resizeCanvas() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
      },
      createFirework() {
        // 시작 위치 (화면 하단에서 시작)
        const startX = Math.random() * this.canvas.width;
        const startY = this.canvas.height;
        
        // 폭발 위치 (화면 상단에서 랜덤하게)
        const explodeX = startX + (Math.random() * 100 - 50);
        const explodeY = this.canvas.height * 0.2 + (Math.random() * this.canvas.height * 0.4);
        
        // 랜덤 색상 생성
        const hue = Math.floor(Math.random() * 360);
        const color = `hsl(${hue}, 100%, 50%)`;
        
        // 폭죽 객체 생성
        const firework = {
          x: startX,
          y: startY,
          explodeX,
          explodeY,
          color,
          velocity: {
            x: (explodeX - startX) / 70, // 70프레임에 도달
            y: (explodeY - startY) / 70
          },
          particles: [],
          exploded: false
        };
        
        this.fireworks.push(firework);
        
        // 1-3초 간격으로 새 폭죽 생성
        setTimeout(() => {
          this.createFirework();
        }, 1000 + Math.random() * 2000);
      },
      startFireworks() {
        const animate = () => {
          // 배경을 반투명하게 그려서 잔상 효과 생성
          this.ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
          this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
          
          // 각 폭죽 업데이트 및 그리기
          for (let i = this.fireworks.length - 1; i >= 0; i--) {
            const firework = this.fireworks[i];
            
            if (!firework.exploded) {
              // 폭죽이 아직 폭발하지 않았으면 상승 중
              firework.x += firework.velocity.x;
              firework.y += firework.velocity.y;
              
              // 폭죽 그리기
              this.ctx.beginPath();
              this.ctx.arc(firework.x, firework.y, 3, 0, Math.PI * 2);
              this.ctx.fillStyle = firework.color;
              this.ctx.fill();
              
              // 목표 높이에 도달하면 폭발
              if (Math.abs(firework.x - firework.explodeX) < 5 && 
                  Math.abs(firework.y - firework.explodeY) < 5) {
                this.explodeFirework(firework);
              }
            } else {
              // 폭발 후 파티클 업데이트
              let particlesLeft = false;
              
              for (let j = firework.particles.length - 1; j >= 0; j--) {
                const particle = firework.particles[j];
                
                // 중력 효과
                particle.velocity.y += 0.05;
                particle.x += particle.velocity.x;
                particle.y += particle.velocity.y;
                particle.alpha -= 0.01;
                
                // 파티클 그리기
                if (particle.alpha > 0) {
                  particlesLeft = true;
                  this.ctx.beginPath();
                  this.ctx.arc(particle.x, particle.y, 2, 0, Math.PI * 2);
                  this.ctx.fillStyle = `hsla(${particle.hue}, 100%, 50%, ${particle.alpha})`;
                  this.ctx.fill();
                } else {
                  firework.particles.splice(j, 1);
                }
              }
              
              // 모든 파티클이 사라지면 폭죽 객체 제거
              if (!particlesLeft) {
                this.fireworks.splice(i, 1);
              }
            }
          }
          
          this.animationFrameId = requestAnimationFrame(animate);
        };
        
        animate();
      },
      explodeFirework(firework) {
        firework.exploded = true;
        
        // 50-80개의 파티클 생성
        const particleCount = 50 + Math.floor(Math.random() * 30);
        const baseHue = parseInt(firework.color.slice(4));
        
        for (let i = 0; i < particleCount; i++) {
          // 360도 방향으로 파티클 퍼짐
          const angle = Math.random() * Math.PI * 2;
          const speed = 1 + Math.random() * 3;
          
          // 색상 약간 변화
          const hueVariation = baseHue + Math.random() * 30 - 15;
          
          firework.particles.push({
            x: firework.x,
            y: firework.y,
            velocity: {
              x: Math.cos(angle) * speed,
              y: Math.sin(angle) * speed
            },
            hue: hueVariation,
            alpha: 1
          });
        }
      },
      stopFireworks() {
        if (this.animationFrameId) {
          cancelAnimationFrame(this.animationFrameId);
        }
        window.removeEventListener('resize', this.resizeCanvas);
      }
    }
  }
  </script>
  
  <style scoped>
  .login-success {
    width: 100%;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    font-family: 'Arial', sans-serif;
    background-color: #f5f5f5;
    position: relative;
    overflow: hidden;
  }
  
  .fireworks-canvas {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    z-index: 1;
  }
  
  .success-container {
    position: relative;
    z-index: 2;
    background-color: white;
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    padding: 40px;
    text-align: center;
    max-width: 500px;
    width: 90%;
  }
  
  .success-icon {
    color: #4CAF50;
    font-size: 64px;
    margin-bottom: 20px;
  }
  
  h1 {
    color: #333;
    margin-bottom: 20px;
  }
  
  p {
    color: #666;
    line-height: 1.6;
    margin-bottom: 30px;
  }
  
  .user-info {
    background-color: #f9f9f9;
    border-radius: 6px;
    padding: 15px;
    margin-bottom: 25px;
    text-align: left;
  }
  
  .btn {
    background-color: #4CAF50;
    color: white;
    border: none;
    padding: 12px 24px;
    border-radius: 4px;
    cursor: pointer;
    font-size: 16px;
    transition: background-color 0.3s;
  }
  
  .btn:hover {
    background-color: #45a049;
  }
  
  .logout-btn {
    background-color: #f44336;
    margin-left: 10px;
  }
  
  .logout-btn:hover {
    background-color: #d32f2f;
  }
  </style>