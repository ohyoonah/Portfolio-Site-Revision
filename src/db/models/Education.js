import { EducationModel } from "../schemas/education";

class Education {
    static async create({ newEducation }) {
        const createdNewEducation = await EducationModel.create(newEducation);
        return createdNewEducation;
    }

    static async findAllById({ userId }) {
        const educations = await EducationModel.find({ userId });
        return educations;
    }

    static async findByEduId({ eduId }) {
        const education = await EducationModel.findOne({ eduId });
        return education;
    }

    static async update(eduId, fieldToUpdate, newValue) {
        const filter = { eduId };
        const update = { [fieldToUpdate]: newValue };
        const option = { returnOriginal : false };

        const updatedEducation = await EducationModel.findOneAndUpdate(
            filter,
            update,
            option
        );
        return updatedEducation;
    }

    static async delete({ eduId }) {
        await EducationModel.findOneAndDelete({ eduId });
        return;
    }
}

export { Education };