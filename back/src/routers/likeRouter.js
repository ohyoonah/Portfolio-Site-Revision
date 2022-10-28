import is from "@sindresorhus/is";
import { Router } from "express";
import { login_required } from "../middlewares/login_required";
import { likeService } from "../services/likeService";
import { userAuthService } from "../services/userService";

const likeRouter = Router();

likeRouter.post(
  "/like",
  login_required,
  async function (req, res, next) {
    try {
      const targetUserId = req.body.userId;
      const userId = req.currentUserId;
      const toUpdate = { likeCount: 1 };

      const newLike = await likeService.addLike({
        userId,
        targetUserId,
      });

      if (newLike.errorMessage) {
        throw new Error(newLike.errorMessage);
      }

      // 해당 사용자 아이디로 사용자 정보를 db에서 찾아 업데이트함. 업데이트 요소가 없을 시 생략함
      const updatedUser = await userAuthService.setUser({ user_id: targetUserId, toUpdate });

      if (updatedUser.errorMessage) {
        throw new Error(updatedUser.errorMessage);
      }

      res.status(201).json(updatedUser);
    } catch (error) {
      next(error);
    }
  }
);


likeRouter.delete(
  "/unlike/:userId",
  login_required,
  async function (req, res, next) {
    try {
      // URI로부터 id를 추출함.
      const targetUserId = req.params.userId;
      const userId = req.currentUserId;
      const toUpdate = { likeCount: -1 };

      // 해당 아이디로 LIKE 정보를 db에서 찾아 삭제함
      const deletedLike = await likeService.deleteLike(userId, targetUserId);

      if (deletedLike.errorMessage) {
        throw new Error(deletedLike.errorMessage);
      }

      // 해당 사용자 아이디로 사용자 정보를 db에서 찾아 업데이트함. 업데이트 요소가 없을 시 생략함
      const updatedUser = await userAuthService.setUser({ user_id: targetUserId, toUpdate });

      // console.log('updatedUser: ', updatedUser)

      if (updatedUser.errorMessage) {
        throw new Error(updatedUser.errorMessage);
      }

      res.status(200).json(updatedUser);
    } catch (error) {
      next(error);
    }
  }
);


// likeRouter.get(
//   "/likes/:likeId",
//   login_required,
//   async function (req, res, next) {
//     try {
//       const userId = req.params.userId;
//       const educationList = await likeService.getEducations({ userId });
//
//       res.status(200).send(educationList);
//     } catch (error) {
//       next(error);
//     }
//   }
// );

export { likeRouter };
