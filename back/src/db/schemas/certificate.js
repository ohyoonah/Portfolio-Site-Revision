import { Schema, model } from "mongoose";

const CertificateSchema = new Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    certificateId: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    acquiredAt: {
      type: Date,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const CertificateModel = model("Certificate", CertificateSchema);

export { CertificateModel };
