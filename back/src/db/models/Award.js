import { AwardModel } from "../schemas/award";

class Award {
    static async create({ newAward }) {
        const createdNewAward = await AwardModel.create(newAward);
        return createdNewAward;
    }

    static async findAllById({ userId }) {
        const awards = await AwardModel.find({ userId });
        return awards;
    }

    static async findByAwardId({ awardId }) {
        const award = await AwardModel.findOne({ awardId });
        return award;
    }

    static async update(awardId, fieldToUpdate, newValue) {
        const filter = { awardId };
        const update = { [fieldToUpdate]: newValue };
        const option = { returnOriginal: false };

        const updatedAward = await AwardModel.findOneAndUpdate(
            filter,
            update,
            option
        );

        return updatedAward;
    }

    static async delete({ awardId }) {
        await AwardModel.findOneAndDelete({ awardId });
        return;
    }
}

export { Award };