import { LikeModel } from "../schemas/like";

class Like {
  static async create({ newLike }) {
    const createdNewLike = await LikeModel.create(newLike);
    return createdNewLike;
  }

  static async findByUserId( userId, targetUserId ) {
    const likes = await LikeModel.find({ userId, targetUserId });
    return likes;
  }

  static async findAndOneDelete( userId, targetUserId ) {
    const like = await LikeModel.findOneAndDelete({ userId, targetUserId  });
    return like;
  }
}

export { Like };
