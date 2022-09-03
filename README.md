# 포트폴리오  공유 Web Team02


> 
>|| [Git Lab](https://kdt-gitlab.elice.io/ai_track/class05/web_project/team02) | [Notion](https://www.notion.so/elice/2-c66bd4fd0b3b4603a36500345f04fd2b) ||
> 
> 나만의 포트폴리오를 만들고 다른 사람들에게 공유해 보세요!
> > <http://kdt-ai5-team02.elicecoding.com>

<br>

## Preview

![시연gif](/team02.gif)


<br>

## Table of Contents

- [Preview](#preview)
- [Features](#features)
- [Used Stacks](#used-stacks)
- [Browser Support](#browser-support)
- [Installing](#installing)
- [File Structure](#file-structure)
- [Authors](#authors)
- [Period of project](#period-of-project)
- [Thanks](#thanks)


<br>

## Features

- 여러 유저들의 포트폴리오를 공유하는 사이트입니다.

- 각 유저의 포트폴리오는 학력, 수상이력, 자격증, 프로젝트로 구성되어 있습니다.

- 네트워크 페이지에서 여러 사람들의 포트폴리오늘 볼 수 있으며, 

- 다른 사람의 포트폴리오를 보고 마음에 들면 좋아요❤️ 버튼을 누를 수 있고,

- 다른사람의 페이지를 보면 조회수가 올라갑니다. 

- 가장 좋아요 수가 높은 유저를 모달창으로 보여주어 확인이 가능합니다.


<br>


## Used Stacks

1. FrontEnd
- React (create-react-app으로 구현)
- React Bootstrap
- axios

2. BackEnd
- Express (nodemon, babel-node로 실행)
- Mongodb, Mongoose


<br>


## Browser Support

![Chrome](https://raw.githubusercontent.com/alrra/browser-logos/main/src/chrome/chrome_48x48.png) | ![Firefox](https://raw.githubusercontent.com/alrra/browser-logos/main/src/firefox/firefox_48x48.png) | ![Safari](https://raw.githubusercontent.com/alrra/browser-logos/main/src/safari/safari_48x48.png) | ![Opera](https://raw.githubusercontent.com/alrra/browser-logos/main/src/opera/opera_48x48.png) | ![Edge](https://raw.githubusercontent.com/alrra/browser-logos/main/src/edge/edge_48x48.png) | ![IE](https://raw.githubusercontent.com/alrra/browser-logos/master/src/archive/internet-explorer_9-11/internet-explorer_9-11_48x48.png) |
--- | --- | --- | --- | --- | --- |
Latest ✔ | Latest ✔ | Latest ✔ | Latest ✔ | Latest ✔ | 11 ✔ |


<br>


## Installing

> yarn은 npm 패키지입니다. yarn부터 설치합니다. (이미 설치 시 생략) \
> 이후, 아래 yarn 커맨드는, yarn install 커맨드의 단축키입니다. \
> 즉, 라이브러리 설치 커맨드입니다. yarn 입력 시 자동으로, \
> package.json 바탕으로 라이브러리를 한꺼번에 설치해 줍니다.

<br>


1. 프론트 엔드 서버 실행 (react-scripts start 실행)

```bash
cd front
npm install --global yarn
yarn
yarn start
```
<br>

2. 백엔드 서버 실행 (Express 실행)

```bash
cd back
yarn
yarn start
```

<br>

## File Structure

1. FrontEnd 
> src 폴더는 크게 components, context, style 폴더로 구분됩니다. \
> 주요기능인 mvp 기능을 담당하는 components 폴더와 \
> 공통 컨텍스트를 담고 있는 context 폴더, 기타 스타일시트 정보를 가지고 있는 style 폴더로 구분됩니다.

- components 폴더:
    - Header.js: 네비게이션 바입니다.<br>
    - Porfolio.js: 메인 화면을 구성하는, 5개 MVP를 모두 포함하는 컴포넌트입니다.<br>
    - popup 폴더: 네트워크 페이지에서 좋아요수 가장 많은 사람을 보여주는 모달창 입니다.<br><br>

  < MVP 컴포넌트 폴더 >
    - award 폴더: 포트폴리오 중 수상이력 관련 컴포넌트들 입니다.<br>
    - certificate 폴더: 포트폴리오 중 자격증 관련 컴포넌트들 입니다.<br>
    - education 폴더: 포트폴리오 중 학력 관련 컴포넌트들 입니다.<br>
    - project 폴더: 포트폴리오 중 프로젝트 관련 컴포넌트들 입니다.<br>
    - user 폴더: 포트폴리오 중 사용자 관련 컴포넌트들 입니다.<br><br>
    
```shell
✔️ MVP 컨포넌트 및 관련 로직
  - 포트폴리오(Porfolio.js) 컴포넌트는 5개 컴포넌트(Awards,Certificates,Educations,Arojects,Users) 컴포넌트를 사용합니다.
  - 복수형 컴포넌트(Awards,Certificates,Educations,Projects,Users)는 항목의 목록으로, 여러 개의 단수형 컴포넌트(Award, Certificate, Education, Project, User)로 구성됩니다.
  - (추가하기 버튼 클릭 시) (컴포넌트명) AddForm 컴포넌트로 구성됩니다.(ex:AwardAddForm)
  - 각 컴포넌트는 isEditing(편집버튼 클릭) 상태에 따라, false면 (컴포넌트명)Card, true면 (컴포넌트명)EditForm이 됩니다.(ex-AwardCard,AwardEditForm)
  - isEditable(포트폴리오 소유자와 현재 로그인한 사용자가 일치할 때)이 true인 경우 편집 버튼이 생깁니다.
  - isAdding이 true면 (컴포넌트명)AddForm, false면 그냥 컴포넌트들의 모음이 됩니다.
  - 삭제 버튼을 누르면 삭제가 가능합니다.
```


- context 폴더:

    - themeProvider.js: 다크모드,라이트모드 localStorage 저장하여 상태 저장 및 구현하는 코드가 있습니다.<br><br>

- style 폴더:

    - GlobalStyles.js: 글로벌 스타일시트 코드가 있습니다.<br>
    - theme.js: 다크모드 컨텐츠 스타일시트 코드가 있습니다.<br>
    - theme.js: 다크모드 토글버튼 스타일시트 코드가 있습니다.<br><br>

- api.js:

    - axios를 사용하는 코드가 있습니다.<br><br>

- App.js:

    - SPA 라우팅 코드가 있습니다.<br><br>

- reducer.js:

    - 로그인, 로그아웃은 useReducer 훅으로 구현되는데, 이 때 사용되는 reducer 함수입니다.<br><br>

- util.js:

  - form validation check function 코드가 있습니다. <br><br>


<br>


2. Backend 
> src 폴더의 주요 폴더는 routers, services, db 폴더 3개이며 그 외 middlewares 폴더까지 \
> 총 4개의 폴더가 있습니다. \
> 주요 폴더에는 각 폴더 별로 MVP 별로 1개씩,  (추가 기능) '좋아요' 기능까지 총 6개 파일이 있습니다. \
(기본 MVP - 학력, 수상내역, 자격사항, 프로젝트, 유저)

- routers:
    - request와 response가 처리됩니다.
    - GET, POST, PUT, DELETE 요청을 처리하고 있습니다.<br><br>
  

- services:
    - 백엔드 로직 코드가 있습니다.<br><br>
  

- db:
    - 데이터베이스 관련한 코드가 있습니다.
    - Mongoose와 mongodb 서버를 연결하는 코드가 있는 index.js
    - Mongoose 스키마가 있는 schemas 폴더
    - Mongoose 모델 ORM 코드가 있는 models 폴더<br><br>


- middlewares:
    - jwt토큰을 다루는 미들웨어인 login_required.js
    - 학습 편의를 위해 일괄 http 400 코드로 에러를 변환하는 에러핸들러인 errorMiddleware.js
    - (추가 기능) 사용자 이미지를 직접 추가할 수 있도록 구현한 uploader.js<br>

  
<br>

## Authors



<code style="color: red">프론트엔드</code>


- <code style="color: red">김예린</code>: Award Mvp, 조회수 기능
- <code style="color: red">오윤아</code>: Project Mvp, 다크모드, 페이지네이션
- <code style="color: red">이재경</code>: Certificate Mvp, 좋아요 기반 모달창
- <code style="color: red">이태의</code>: Education Mvp, 좋아요, User 프로필 이미지 변경

<br>
<code style="color: blue">백엔드</code>


- <code style="color: blue">박지연</code>: Award Mvp, Education Mvp
- <code style="color: blue">연다은봄</code>: Project Mvp, Certificate Mvp, 페이지네이션
- <code style="color: blue">이태의</code>: 조회수 기능, 좋아요, 좋아요 기반 모달창, User 프로필 이미지 변경

<br>



## Period Of Project

📅 2022.08.22 - 2022.09.02

<br>


## Thanks

- frontend 김민성 코치님, backend 박송원 코치님
- 엘리스, 구글, w3schools, 유튜브, mozilla.org, node.js ....