import { Project } from "../db/models/Project";

class projectService {
  static async addProject({
    userId,
    projectId,
    title,
    description,
    startDate,
    endDate,
  }) {
    const newProject = {
      userId,
      projectId,
      title,
      description,
      startDate,
      endDate,
    };
    const createdNewProject = await Project.create({ newProject });
    createdNewProject.errorMessage = null;
    return createdNewProject;
  }

  static async findProjectsByUserId({ userId }) {
    const foundProjects = await Project.findAllByUserId({ userId });
    return foundProjects;
  }

  static async findOneByProjectId({ projectId }) {
    const foundOneProject = await Project.findOneByProjectId({ projectId });
    return foundOneProject;
  }

  static async updateProject({ projectId, toUpdate }) {
    let project = await Project.findOneByProjectId({ projectId });
    if (!project) {
      const errorMessage =
        "해당 프로젝트를 확인할 수 없습니다. 다시 한 번 확인해 주세요.";
      return { errorMessage };
    }
    if (!toUpdate.title) {
      const errorMessage = "프로젝트 제목을 입력해주세요.";
      return { errorMessage };
    }
    if (!toUpdate.description) {
      const errorMessage = "상세내역을 입력해주세요.";
      return { errorMessage };
    }
    if (!toUpdate.startDate) {
      const errorMessage = "프로젝트 시작 날짜를 입력해주세요.";
      return { errorMessage };
    }
    if (!toUpdate.endDate) {
      const errorMessage = "프로젝트 끝 날짜를 입력해주세요.";
      return { errorMessage };
    }

    if (toUpdate.title) {
      const fieldToUpdate = "title";
      const newValue = toUpdate.title;
      project = await Project.update(projectId, fieldToUpdate, newValue);
    }
    if (toUpdate.description) {
      const fieldToUpdate = "description";
      const newValue = toUpdate.description;
      project = await Project.update(projectId, fieldToUpdate, newValue);
    }
    if (toUpdate.startDate) {
      const fieldToUpdate = "startDate";
      const newValue = toUpdate.startDate;
      project = await Project.update(projectId, fieldToUpdate, newValue);
    }
    if (toUpdate.endDate) {
      const fieldToUpdate = "endDate";
      const newValue = toUpdate.endDate;
      project = await Project.update(projectId, fieldToUpdate, newValue);
    }
    return project;
  }

  static async deleteProject({ projectId }) {
    return await Project.delete({
      projectId,
    });
  }
}

export { projectService };
