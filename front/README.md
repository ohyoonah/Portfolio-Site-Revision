# | Frontend | 포트폴리오 공유 Web Team02


## Installing

> **[ react-scripts start 실행 ]**  \
> 현재 경로가 **./front** 가 맞는지 확인해 주세요. \
>  yarn은 npm 패키지입니다. yarn부터 설치합니다. (이미 설치 시 생략) \
> 이후, 아래 yarn 커맨드는, yarn install 커맨드의 단축키입니다. \
> 즉, 라이브러리 설치 커맨드입니다. yarn 입력 시 자동으로, \
> package.json 바탕으로 라이브러리를 한꺼번에 설치해 줍니다.



```bash
npm install --global yarn
yarn
yarn start
```



<br>

## File Structure


📦src<br>
┣ 📂components<br>
┃ ┣ 📂award<br>
┃ ┃ ┣ 📜Award.js<br>
┃ ┃ ┣ 📜AwardAddForm.js<br>
┃ ┃ ┣ 📜AwardCard.js<br>
┃ ┃ ┣ 📜AwardEditForm.js<br>
┃ ┃ ┗ 📜Awards.js<br>
┃ ┣ 📂certificates<br>
┃ ┃ ┣ 📜Certificate.js<br>
┃ ┃ ┣ 📜CertificateAddForm.js<br>
┃ ┃ ┣ 📜CertificateCard.js<br>
┃ ┃ ┣ 📜CertificateEditForm.js<br>
┃ ┃ ┗ 📜Certificates.js<br>
┃ ┣ 📂education<br>
┃ ┃ ┣ 📜Education.js<br>
┃ ┃ ┣ 📜EducationAddForm.js<br>
┃ ┃ ┣ 📜EducationCard.js<br>
┃ ┃ ┣ 📜EducationEditForm.js<br>
┃ ┃ ┗ 📜Educations.js<br>
┃ ┣ 📂popup<br>
┃ ┃ ┗ 📜modal.js<br>
┃ ┣ 📂project<br>
┃ ┃ ┣ 📜Project.js<br>
┃ ┃ ┣ 📜ProjectAddForm.js<br>
┃ ┃ ┣ 📜ProjectCard.js<br>
┃ ┃ ┣ 📜ProjectEditForm.js<br>
┃ ┃ ┗ 📜Projects.js<br>
┃ ┣ 📂user<br>
┃ ┃ ┣ 📜LoginForm.js<br>
┃ ┃ ┣ 📜Network.js<br>
┃ ┃ ┣ 📜Pagination.js<br>
┃ ┃ ┣ 📜RegisterForm.js<br>
┃ ┃ ┣ 📜User.js<br>
┃ ┃ ┣ 📜UserCard.js<br>
┃ ┃ ┗ 📜UserEditForm.js<br>
┃ ┣ 📜Header.js<br>
┃ ┗ 📜Portfolio.js<br>
┣ 📂context<br>
┃ ┗ 📜themeProvider.js<br>
┣ 📂style<br>
┃ ┣ 📜GlobalStyles.js<br>
┃ ┣ 📜theme.js<br>
┃ ┗ 📜ThemeToggle.js<br>
┣ 📜api.js<br>
┣ 📜App.js<br>
┣ 📜index.js<br>
┣ 📜reducer.js<br>
┗ 📜util.js

<br>

## File Structure Description

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