import { Award } from "../db";
import { v4 as uuidv4 } from "uuid";

class awardService {
    static async addAward({ userId, title, description }) {
        const awardId = uuidv4();

        const newAward = { userId, awardId, title, description };

        const createdNewAward = await Award.create({ newAward });
        createdNewAward.errorMessage = null;

        return createdNewAward;
    }

    static async getAwards({ userId }) {
        const awards = await Award.findAllById({ userId: userId });

        return awards;
    }

    static async findOneByAwardId({ awardId }) {
        const foundOneAward = await Award.findByAwardId({ awardId });
        return foundOneAward;
    }

    static async updateAward({ awardId, toUpdate }) {
        let award = await Award.findByAwardId({ awardId });

        if (!award) {
            const errorMessage = "해당 수상 내역을 찾을 수 없습니다. 다시 한 번 확인해 주세요.";
            return { errorMessage };
        }

        // title 필드 수정 시
        if (toUpdate.title) {
            const fieldToUpdate = "title";
            const newValue = toUpdate.title;
            award = await Award.update(awardId, fieldToUpdate, newValue);
        }

        // description 필드 수정 시
        if (toUpdate.description) {
            const fieldToUpdate = "description";
            const newValue = toUpdate.description;
            award = await Award.update(awardId, fieldToUpdate, newValue);
        }
        
        return award;
    }

    static async deleteAward({ awardId }) {
        await Award.delete({ awardId });
        return;
    }
}

export { awardService };