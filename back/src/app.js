import cors from "cors";
import express from "express";
import { userAuthRouter } from "./routers/userRouter";
import { projectRouter } from "./routers/projectRouter";
import { certificateRouter } from "./routers/certificateRouter";
import { educationRouter } from "./routers/educationRouter";
import { awardRouter } from "./routers/awardRouter";
import { likeRouter } from "./routers/likeRouter";
import { errorMiddleware } from "./middlewares/errorMiddleware";
import * as path from "path";
import * as fs from "fs";
const app = express();
const dir = path.join(__dirname, '..', '/public/images/');

// CORS 에러 방지
app.use(cors());

// express 기본 제공 middleware
// express.json(): POST 등의 요청과 함께 오는 json형태의 데이터를 인식하고 핸들링할 수 있게 함.
// express.urlencoded: 주로 Form submit 에 의해 만들어지는 URL-Encoded 형태의 데이터를 인식하고 핸들링할 수 있게 함.
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// 기본 페이지
app.get("/", (req, res) => {
  res.send("안녕하세요, 레이서 Team02 포트폴리오 공유 서비스 프로젝트 API 입니다.");
});


// 이미지 조회
app.get("/image/:id", (req, res) => {
    const url1 = path.join(dir, `${req.params.id}.png`);
    const url2 = path.join(dir, `${req.params.id}.jpg`);
    const url3 = path.join(dir, `${req.params.id}.jpeg`);

    if (fs.existsSync(url1)) {
      res.sendFile(url1);
    } else if (fs.existsSync(url2)) {
      res.sendFile(url2);
    } else if (fs.existsSync(url3)) {
      res.sendFile(url3);
    }
  }
);

// router, service 구현
app.use(userAuthRouter);
app.use(projectRouter);
app.use(certificateRouter);
app.use(educationRouter);
app.use(awardRouter);
app.use(likeRouter);

// 순서 중요 (router 에서 next() 시 아래의 에러 핸들링  middleware로 전달됨)
app.use(errorMiddleware);

export { app };
