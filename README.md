## 💻 포트폴리오 공유 웹 사이트

개인의 포트폴리오를 작성해서 유저들과 공유할 수 있는 웹 사이트 입니다.

🔗 [블로그 기술 정리](https://ohyoonah.github.io/project/2022-09-29-web-portfolio-site/)

<br>

![시연](./front/public/test_1.gif)
![시연](./front/public/test_2.gif)

<br>

## 📅 개발 기간

**2022.08.22 ~ 2022.09.02**

<br>

## ⚙ 실행 방법

```
npm install --global yarn
cd front / cd back
yarn
yarn start
```

<br>

## 🏆 담당 파트

**프론트엔트**

- 비동기 통신을 통한 프로젝트 MVP CRUD 구현
- 다크모드 구현 및 로컬스토리지 상태 저장
- 페이지네이션 기능 구현
- 팝업창 노출 여부 관리
- 디자인 정리

<br>

## 🛠 기술 스택

React, styled-components, Bootstrap, Node.js, MongoDB

<br>

## 💡 컴포넌트 구조

- **`Projects.js`**: 항목의 목록으로, 여러 개의 `Project` 컴포넌트로 구성
- **`Project.js`**: 게시글 하나에 들어가는 것들을 작성한 컴포넌트
- **`ProjectAddForm.js`**: 추가하기 버튼 클릭 시 보여지는 폼으로, `create` 기능이 구현된 컴포넌트
- **`ProjectEdit.js`**: 유저가 본인의 페이지에 접속해서 편집 가능 상태가 되었을 때 보여지는 페이지로, `update` 기능이 구현된 컴포넌트
- **`ProjectCard.js`**: 편집 상태가 아닐 때 보여지는 컴포넌트

<br>

- **`themeProvider.js`**
- **`theme.js`**
- **`GlobalStyles.js / `**: 다크모드 관련 로직을 작성

<br>

- **`Network.js`**
- **`Pagination.js`**: 페이지네이션 관련 로직을 작성

<br>

- **`modal.js`**: 모달창 localStorage 관련 코드 작성
