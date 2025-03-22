# login-frontend
Vue.js 기반으로 로그인 회원가입 기능을 구현해보는 프로젝트입니다.  


각자의 이름 폴더(ex.`/src/minju`) 안에서 자유롭게 작업해주세요!  


각 폴더 안에서는 `views`, `components` 등 구조를 자유롭게 구성해서 작업하시면 됩니다.  


router 설정은 `router/index.js` 에서 해주시고, 경로 시작점을 본인 이름으로 해주세요. (ex. `/minju/login`)

</br>

# 프로젝트 실행 방법
레포지토리를 본인 계정으로 fork 한 후 

아래 명령어를 cmd에서 차례대로 실행해 주세요.
```
git clone https://github.com/{본인 아이디}/login-frontend.git   // 포크한 레포지토리 클론 받기
cd login-frontend  //프로젝트 폴더로 이동
npm install  //package.json 에 정의된 의존성 패키지들을 node_modules 폴더에 설치해주는 명령어
npm run dev //프로젝트 실행
```

</br>

# 커밋 컨벤션
커밋 메시지 규칙입니다. 커밋 타입에 맞춰서 적어주세요.  
>  type은 모두 소문자로 통일하겠습니다.
```
<type>: <작업 요약>    ex) feat: 로그인 기능 추가
```


## commit type 종류
| type	| 설명 |
| --- | --- |
| feat |	새로운 기능 추가  |
| fix |	버그 수정  |
| refactor	| 코드 리팩토링 |  
| docs	| 문서 작성/수정   |
| style	| 스타일 (포맷, 세미콜론 등) 변경  |
| test	| 테스트 코드 추가/ 수정   |
| chore	| 기타 변경 (빌드 설정 등)  |

</br>

# PR(Pull Request) 만드는 방법

본인 레포지토리의 작업물을 원본 레포지토리로 커밋하고 싶은 경우 `Pull Request`를 만듭니다.  


Github 본인 레포에서 `contribute` 클릭 후 `Pull Request` 생성 -> 커밋 컨벤션에 맞춰서 작업물에 대해 설명해주세요.  

</br>

# 원본 레포지토리에서 Pull 받는 방법
원본 레포지토리의 변경 사항(최신코드)을 본인 레포지토리로 가져오기 위해서는 pull을 받아야 합니다.  


Github 본인 레포에서 `sync fork` 클릭 후 cmd에서 `git pull origin main` 으로 가져올 수 있습니다.

</br>

# 협업 규칙
- 커밋은 작게, 자주 하는게 좋습니다. (보통 하나의 작업 단위로 합니다.)
  
- 브랜치로 작업 space를 분리해서 작업해보고 싶은 사람은 git branch를 검색해서 경험해보는 것을 추천드립니다.
  (하다가 branch 꼬이면 도와줄게요!!)
  
- PR에는 작업 내용과 이유를 상세히 작성합니다.
  
- 충돌이 생겼을 경우, 직접 해결하고 병합합니다. (모르겠으면 물어봐주세요~~~)
  
- 다른 사람의 작업 파일은 함부로 수정하지 말아주세요.
  
- 원본 레포지토리의 `main` 브랜치에서는 직접 작업하지 않기. 항상 PR을 만들어주세요!!


# 사용 기술
- Vue 3 + Vite
  
- vue-router 4

