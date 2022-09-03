import { Certificate, User } from "../db";

class certificateService {
  static async addCertificate({
    userId,
    certificateId,
    title,
    description,
    acquiredAt,
  }) {
    const newCertificate = {
      userId,
      certificateId,
      title,
      description,
      acquiredAt,
    };

    const createdNewCertificate = await Certificate.create({ newCertificate });
    createdNewCertificate.errorMessage = null;
    return createdNewCertificate;
  }

  static async findCertificatesByUserId({ userId }) {
    const foundCertificates = await Certificate.findAllByUserId({
      userId,
    });
    return foundCertificates;
  }

  static async findOneByCertificateId({ certificateId }) {
    const foundOneCertificate = await Certificate.findOneByCertificateId({
      certificateId,
    });
    return foundOneCertificate;
  }

  static async updateCertificate({ certificateId, toUpdate }) {
    let certificate = await Certificate.findOneByCertificateId({
      certificateId,
    });
    if (!certificate) {
      const errorMessage =
        "해당 자격증을 찾을 수 없습니다. 다시 한 번 확인해 주세요.";
      return { errorMessage };
    }
    if (!toUpdate.title) {
      const errorMessage = "자격증 이름을 입력해주세요.";
      return { errorMessage };
    }
    if (!toUpdate.description) {
      const errorMessage = "상세내역을 입력해주세요.";
      return { errorMessage };
    }
    if (!toUpdate.acquiredAt) {
      const errorMessage = "취득날짜를 입력해주세요.";
      return { errorMessage };
    }

    if (toUpdate.title) {
      const fieldToUpdate = "title";
      const newValue = toUpdate.title;
      certificate = await Certificate.update(
        certificateId,
        fieldToUpdate,
        newValue
      );
    }

    if (toUpdate.description) {
      const fieldToUpdate = "description";
      const newValue = toUpdate.description;
      certificate = await Certificate.update(
        certificateId,
        fieldToUpdate,
        newValue
      );
    }

    if (toUpdate.acquiredAt) {
      const fieldToUpdate = "acquiredAt";
      const newValue = toUpdate.acquiredAt;
      certificate = await Certificate.update(
        certificateId,
        fieldToUpdate,
        newValue
      );
    }

    return certificate;
  }

  static async deleteCertificate({ certificateId }) {
    return await Certificate.delete({
      certificateId,
    });
  }
}

export { certificateService };
