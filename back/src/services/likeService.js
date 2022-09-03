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
        // 우선 해당 id 의 좋아요 내역이 db에 존재하는지 여부 확인
        let like = await Like.findByUserId(userId, targetUserId);

        // db에서 찾지 못한 경우, 에러 메시지 반환
        if (!like) {
            const errorMessage =
              "좋아요 내역이 없습니다. 다시 한 번 확인해 주세요.";
            return { errorMessage };
        }

        like = await Like.findAndOneDelete(userId, targetUserId);

        return like;
    }

    // static async getLikes({ userId }) {
    //     const likes = await Like.findAllById({ userId: userId });
    //     return likes;
    // }
}

export { likeService };