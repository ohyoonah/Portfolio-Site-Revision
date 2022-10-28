import { Education } from "../db";
import { v4 as uuidv4 } from "uuid";

class educationService {
  static async addEducation({ userId, school, major, position }) {
    const eduId = uuidv4();

    const newEducation = { userId, eduId, school, major, position };

    const createdNewEducation = await Education.create({ newEducation });
    createdNewEducation.errorMessage = null;

    return createdNewEducation;
  }

  static async getEducations({ userId }) {
    const educations = await Education.findAllById({ userId: userId });
    return educations;
  }

  static async findOneByEducationId({ eduId }) {
    const foundOneEducation = await Education.findByEduId({ eduId });
    return foundOneEducation;
  }

  static async updateEducation({ eduId, toUpdate }) {
    let education = await Education.findByEduId({ eduId });

    if (!education) {
      const errorMessage =
        "해당 학력 사항을 찾을 수 없습니다. 다시 한 번 확인해 주세요.";
      return { errorMessage };
    }

    if (toUpdate.school) {
      const fieldToUpdate = "school";
      const newValue = toUpdate.school;
      education = await Education.update(eduId, fieldToUpdate, newValue);
    }

    if (toUpdate.major) {
      const fieldToUpdate = "major";
      const newValue = toUpdate.major;
      education = await Education.update(eduId, fieldToUpdate, newValue);
    }

    if (toUpdate.position) {
      const fieldToUpdate = "position";
      const newValue = toUpdate.position;
      education = await Education.update(eduId, fieldToUpdate, newValue);
    }

    return education;
  }

  static async deleteEducation({ eduId }) {
    await Education.delete({ eduId });
    return;
  }
}

export { educationService };
