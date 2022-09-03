import is from "@sindresorhus/is";
import { Router } from "express";
import { User } from "../db";
import { UserModel } from "../db/schemas/user";
import { login_required } from "../middlewares/login_required";
import { userAuthService } from "../services/userService";
import { uploader } from "../middlewares/uploader";

const userAuthRouter = Router();

userAuthRouter.post(
  "/user/upload/:id",
  uploader.single("file"),
  (req, res, next) => {
    try {
      res.status(201).json(true);
    } catch (e) {
      next(e);
    }
  }
);

userAuthRouter.post("/user/register", async function (req, res, next) {
  try {
    if (is.emptyObject(req.body)) {
      throw new Error(
        "headers의 Content-Type을 application/json으로 설정해주세요."
      );
    }

    const { name, email, password } = req.body;

    if (!name) {
      throw new Error("이름을 입력해주세요.");
    }
    if (!email) {
      throw new Error("이메일 주소를 입력해주세요.");
    }
    if (!password) {
      throw new Error("비밀번호를 입력해주세요.");
    }

    // 위 데이터를 유저 db에 추가하기
    const newUser = await userAuthService.addUser({
      name,
      email,
      password,
    });

    if (newUser.errorMessage) {
      throw new Error(newUser.errorMessage);
    }

    res.status(201).json(newUser);
  } catch (error) {
    next(error);
  }
});

userAuthRouter.post("/user/login", async function (req, res, next) {
  try {
    // req (request) 에서 데이터 가져오기
    const { email, password } = req.body;

    // 위 데이터를 이용하여 유저 db에서 유저 찾기
    const user = await userAuthService.getUser({ email, password });

    if (user.errorMessage) {
      throw new Error(user.errorMessage);
    }

    res.status(200).send(user);
  } catch (error) {
    next(error);
  }
});

userAuthRouter.get(
  "/userlist",
  login_required,
  async function (req, res, next) {
    try {
      const page = parseInt(req.query.page || 1);
      const perPage = parseInt(req.query.perPage || 12);

      const total = await UserModel.countDocuments({});

      // jwt토큰에서 사용자 id를 추출
      const id = req.currentUserId;
      const users = await User.findAllNetwork(id, page, perPage);

      const totalPage = Math.ceil(total / perPage);
      const pagination = { users, page, perPage, totalPage };

      return res.status(200).json(pagination);
    } catch (error) {
      next(error);
    }
  }
);

userAuthRouter.get(
  "/user/current",
  login_required,
  async function (req, res, next) {
    try {
      // jwt토큰에서 추출된 사용자 id를 가지고 db에서 사용자 정보를 찾음.
      const user_id = req.currentUserId;
      const currentUserInfo = await userAuthService.getUserInfo({
        user_id,
      });

      if (currentUserInfo.errorMessage) {
        throw new Error(currentUserInfo.errorMessage);
      }

      res.status(200).send(currentUserInfo);
    } catch (error) {
      next(error);
    }
  }
);

userAuthRouter.get(
  "/users/maxlike",
  login_required,
  async function (req, res, next) {
    try {
      const maxLikeUserInfo = await userAuthService.getUserMaxLike();

      res.status(200).send(maxLikeUserInfo);
    } catch (error) {
      next(error);
    }
  }
);

userAuthRouter.put(
  "/users/:id",
  login_required,
  async function (req, res, next) {
    try {
      // URI로부터 사용자 id를 추출함.
      const user_id = req.params.id;
      // body data 로부터 업데이트할 사용자 정보를 추출함.
      const name = req.body.name ?? null;
      const email = req.body.email ?? null;
      const password = req.body.password ?? null;
      const description = req.body.description ?? null;
      let imageUploaded = req.body.imageUploaded ?? null;
      const defaultImage = req.body.defaultImage ?? null;
      const likeCount = req.body.likeCount ?? null;
      const viewCount = req.body.viewCount ?? null;

      if (defaultImage) {
        imageUploaded = false;
      }

      const toUpdate = {
        name,
        email,
        password,
        description,
        imageUploaded,
        defaultImage,
        likeCount,
        viewCount,
      };

      // 해당 사용자 아이디로 사용자 정보를 db에서 찾아 업데이트함. 업데이트 요소가 없을 시 생략함
      const updatedUser = await userAuthService.setUser({ user_id, toUpdate });

      if (updatedUser.errorMessage) {
        throw new Error(updatedUser.errorMessage);
      }

      res.status(200).json(updatedUser);
    } catch (error) {
      next(error);
    }
  }
);

userAuthRouter.get(
  "/users/:id",
  login_required,
  async function (req, res, next) {
    try {
      const user_id = req.params.id;
      const currentUserInfo = await userAuthService.getUserInfo({ user_id });

      if (currentUserInfo.errorMessage) {
        throw new Error(currentUserInfo.errorMessage);
      }

      res.status(200).send(currentUserInfo);
    } catch (error) {
      next(error);
    }
  }
);

export { userAuthRouter };
