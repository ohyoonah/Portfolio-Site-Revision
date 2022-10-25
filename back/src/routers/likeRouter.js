import is from "@sindresorhus/is";
import { Router } from "express";
import { login_required } from "../middlewares/login_required";
import { likeService } from "../services/likeService";
import { userAuthService } from "../services/userService";

const likeRouter = Router();

likeRouter.post("/like", login_required, async function (req, res, next) {
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

    const updatedUser = await userAuthService.setUser({
      user_id: targetUserId,
      toUpdate,
    });

    if (updatedUser.errorMessage) {
      throw new Error(updatedUser.errorMessage);
    }

    res.status(201).json(updatedUser);
  } catch (error) {
    next(error);
  }
});

likeRouter.delete(
  "/unlike/:userId",
  login_required,
  async function (req, res, next) {
    try {
      const targetUserId = req.params.userId;
      const userId = req.currentUserId;
      const toUpdate = { likeCount: -1 };

      const deletedLike = await likeService.deleteLike(userId, targetUserId);

      if (deletedLike.errorMessage) {
        throw new Error(deletedLike.errorMessage);
      }

      const updatedUser = await userAuthService.setUser({
        user_id: targetUserId,
        toUpdate,
      });

      if (updatedUser.errorMessage) {
        throw new Error(updatedUser.errorMessage);
      }

      res.status(200).json(updatedUser);
    } catch (error) {
      next(error);
    }
  }
);

export { likeRouter };
