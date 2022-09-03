import { Schema, model } from "mongoose";

const EducationSchema = new Schema(
    {
        userId: {
            type: String,
            required: true,
        },
        eduId: {
            type: String,
            required: true,
        },
        school: {
            type: String,
            required: true,
        },
        major: {
            type: String,
            required: true,
        },
        position: {
            type: String,
            required: true,
        },
    }
);

const EducationModel = model("Education", EducationSchema);

export { EducationModel };