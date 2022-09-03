import { Schema, model } from "mongoose";

const LikeSchema = new Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    likeId: {
      type: String,
      required: true,
    },
    targetUserId: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const LikeModel = model("Like", LikeSchema);

export { LikeModel };
