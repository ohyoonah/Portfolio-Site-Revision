import { ProjectModel } from "../schemas/project";

class Project {
  static async create({ newProject }) {
    const createdNewCertificate = await ProjectModel.create(newProject);
    return createdNewCertificate;
  }

  static async findAllByUserId({ userId }) {
    const foundProjects = await ProjectModel.find({ userId });
    return foundProjects;
  }

  static async findOneByProjectId({ projectId }) {
    const foundOneProject = await ProjectModel.findOne({
      projectId,
    });
    return foundOneProject;
  }

  static async update(projectId, fieldToUpdate, newValue) {
    const filter = { projectId };
    const update = { [fieldToUpdate]: newValue };
    const option = { returnOriginal: false };
    const updatedProject = await ProjectModel.findOneAndUpdate(
      filter,
      update,
      option
    );
    return updatedProject;
  }

  static async delete({ projectId }) {
    return await ProjectModel.findOneAndDelete({ projectId });
  }
}

export { Project };
