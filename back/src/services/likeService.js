import { Like } from "../db";
import { v4 as uuidv4 } from "uuid";

class likeService {
  static async addLike({ userId, targetUserId }) {
    const likeId = uuidv4();

    const newLike = { userId, likeId, targetUserId };

    const createdNewLike = await Like.create({ newLike });
    createdNewLike.errorMessage = null;

    return createdNewLike;
  }

  static async deleteLike(userId, targetUserId) {
    let like = await Like.findByUserId(userId, targetUserId);

    if (!like) {
      const errorMessage = "좋아요 내역이 없습니다. 다시 한 번 확인해 주세요.";
      return { errorMessage };
    }

    like = await Like.findAndOneDelete(userId, targetUserId);

    return like;
  }
}

export { likeService };
