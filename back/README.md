# | Backend | 포트폴리오  공유 Web Team02


## Installing

> **[ Express 실행 ]**  \
> 현재 경로가 **./back** 이 맞는지 확인해 주세요. \
> yarn은 npm 패키지입니다. yarn부터 설치합니다. (이미 설치 시 생략) \
> 이후, 아래 yarn 커맨드는, yarn install 커맨드의 단축키입니다. \
> 즉, 라이브러리 설치 커맨드입니다. yarn 입력 시 자동으로, \
package.json 바탕으로 라이브러리를 한꺼번에 설치해 줍니다.



```bash
npm install --global yarn
yarn
yarn start
```



<br>

## File Structure

📦src \
 ┣ 📂db \
 ┃ ┣ 📂models \
 ┃ ┃ ┣ 📜Award.js \
 ┃ ┃ ┣ 📜Certificate.js \
 ┃ ┃ ┣ 📜Education.js \
 ┃ ┃ ┣ 📜Like.js \
 ┃ ┃ ┣ 📜Project.js \
 ┃ ┃ ┗ 📜User.js \
 ┃ ┣ 📂schemas \
 ┃ ┃ ┣ 📜award.js \
 ┃ ┃ ┣ 📜certificate.js \
 ┃ ┃ ┣ 📜education.js \
 ┃ ┃ ┣ 📜like.js \
 ┃ ┃ ┣ 📜project.js \
 ┃ ┃ ┗ 📜user.js \
 ┃ ┗ 📜index.js \
 ┣ 📂middlewares \
 ┃ ┣ 📜errorMiddleware.js \
 ┃ ┣ 📜login_required.js \
 ┃ ┗ 📜uploader.js \
 ┣ 📂routers \
 ┃ ┣ 📜awardRouter.js \
 ┃ ┣ 📜certificateRouter.js \
 ┃ ┣ 📜educationRouter.js \
 ┃ ┣ 📜likeRouter.js \
 ┃ ┣ 📜projectRouter.js \
 ┃ ┗ 📜userRouter.js \
 ┣ 📂services \
 ┃ ┣ 📜awardService.js \
 ┃ ┣ 📜certificateService.js \
 ┃ ┣ 📜educationService.js \
 ┃ ┣ 📜likeService.js \
 ┃ ┣ 📜projectService.js \
 ┃ ┗ 📜userService.js \
 ┗ 📜app.js

<br>


## File Structure Description

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