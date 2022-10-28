import { CertificateModel } from "../schemas/certificate";

class Certificate {
  static async create({ newCertificate }) {
    const createdNewCertificate = await CertificateModel.create(newCertificate);
    return createdNewCertificate;
  }

  static async findAllByUserId({ userId }) {
    const certificates = await CertificateModel.find({ userId });
    return certificates;
  }

  static async findOneByCertificateId({ certificateId }) {
    const foundCertificate = await CertificateModel.findOne({
      certificateId,
    });
    return foundCertificate;
  }

  static async update(certificateId, fieldToUpdate, newValue) {
    const filter = { certificateId };
    const update = { [fieldToUpdate]: newValue };
    const option = { returnOriginal: false };

    const updatedCertificate = await CertificateModel.findOneAndUpdate(
      filter,
      update,
      option
    );
    return updatedCertificate;
  }

  static async delete({ certificateId }) {
    return await CertificateModel.findOneAndDelete({
      certificateId,
    });
  }
}

export { Certificate };
