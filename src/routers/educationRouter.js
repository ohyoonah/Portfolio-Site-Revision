import is from "@sindresorhus/is";
import { Router } from "express";
import { login_required } from "../middlewares/login_required";
import { educationService } from "../services/educationService";

const educationRouter = Router();

educationRouter.post(
  "/education/create",
  login_required,
  async function (req, res, next) {
    try {
      if (is.emptyObject(req.body)) {
        throw new Error(
          "headers의 Content-Type을 application/json으로 설정해 주세요."
        );
      }

      const userId = req.currentUserId;
      const { school, major, position } = req.body;

      if (!school) {
        throw new Error("학교명을 입력해 주세요.");
      }

      if (!major) {
        throw new Error("전공명을 입력해 주세요.");
      }

      if (!position) {
        throw new Error("학력 상태를 설정해 주세요.");
      }

      const newEducation = await educationService.addEducation({
        userId,
        school,
        major,
        position,
      });

      if (newEducation.errorMessage) {
        throw new Error(newEducation.errorMessage);
      }

      res.status(201).json(newEducation);
    } catch (error) {
      next(error);
    }
  }
);

educationRouter.put(
  "/educations/:eduId",
  login_required,
  async function (req, res, next) {
    const userId = req.currentUserId;
    const { eduId } = req.params;

    const foundEducation = await educationService.findOneByEducationId({
      eduId,
    });
    if (userId === foundEducation.userId) {
      try {
        const school = req.body.school ?? null;
        const major = req.body.major ?? null;
        const position = req.body.position ?? null;

        const toUpdate = { school, major, position };
        const updatedEducation = await educationService.updateEducation({
          eduId,
          toUpdate,
        });

        if (updatedEducation.errorMessage) {
          throw new Error(updatedEducation.errorMessage);
        }

        return res.status(201).json(updatedEducation);
      } catch (error) {
        next(error);
      }
    }
    res.status(401).json({ message: "작성자만 수정할 수 있습니다." });
  }
);

educationRouter.get(
  "/educations/:userId",
  login_required,
  async function (req, res, next) {
    try {
      const userId = req.params.userId;
      const educationList = await educationService.getEducations({ userId });

      res.status(200).send(educationList);
    } catch (error) {
      next(error);
    }
  }
);

educationRouter.delete(
  "/educations/:eduId",
  login_required,
  async function (req, res, next) {
    const userId = req.currentUserId;
    const { eduId } = req.params;
    const foundEducation = await educationService.findOneByEducationId({
      eduId,
    });

    if (userId === foundEducation.userId) {
      await educationService.deleteEducation({ eduId });
      return res.status(201).send("정상적으로 삭제되었습니다.");
    }
    res.status(401).json({ message: "작성자만 삭제할 수 있습니다." });
  }
);

export { educationRouter };
