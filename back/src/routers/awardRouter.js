import is from "@sindresorhus/is";
import { Router } from "express";
import { login_required } from "../middlewares/login_required";
import { awardService } from "../services/awardService";

const awardRouter = Router();

awardRouter.post(
  "/award/create",
  login_required,
  async function (req, res, next) {
    try {
      if (is.emptyObject(req.body)) {
        throw new Error(
          "headers의 Content-Type을 application/json으로 설정해 주세요."
        );
      }

      const userId = req.currentUserId;
      const { title, description } = req.body;

      if (!title) {
        throw new Error("제목을 입력해 주세요.");
      }

      if (!description) {
        throw new Error("설명을 입력해 주세요.");
      }

      const newAward = await awardService.addAward({
        userId,
        title,
        description,
      });

      if (newAward.errorMessage) {
        throw new Error(newAward.errorMessage);
      }

      res.status(201).json(newAward);
    } catch (error) {
      next(error);
    }
  }
);

awardRouter.put(
  "/awards/:awardId",
  login_required,
  async function (req, res, next) {
    const userId = req.currentUserId;
    const { awardId } = req.params;
    const foundAward = await awardService.findOneByAwardId({ awardId });
    if (userId === foundAward.userId) {
      try {
        const title = req.body.title ?? null;
        const description = req.body.description ?? null;

        const toUpdate = { title, description };

        const updatedAward = await awardService.updateAward({
          awardId,
          toUpdate,
        });

        if (updatedAward.errorMessage) {
          throw new Error(updatedEducation.errorMessage);
        }

        return res.status(201).json(updatedAward);
      } catch (error) {
        next(error);
      }
    }
    return res.status(401).json({ message: "작성자만 수정할 수 있습니다." });
  }
);

awardRouter.get(
  "/awards/:userId",
  login_required,
  async function (req, res, next) {
    try {
      const userId = req.params.userId;
      const awards = await awardService.getAwards({ userId });

      return res.status(200).send(awards);
    } catch (error) {
      next(error);
    }
  }
);

awardRouter.delete(
  "/awards/:awardId",
  login_required,
  async function (req, res, next) {
    const userId = req.currentUserId;
    const { awardId } = req.params;
    const foundAward = await awardService.findOneByAwardId({ awardId });

    if (userId === foundAward.userId) {
      await awardService.deleteAward({ awardId });
      return res.status(201).send({ message: "정상적으로 삭제되었습니다." });
    }

    return res.status(401).send({ message: "작성자만 삭제할 수 있습니다." });
  }
);

export { awardRouter };
