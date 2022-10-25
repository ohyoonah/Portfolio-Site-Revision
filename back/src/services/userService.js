import { User } from "../db";
import bcrypt from "bcrypt";
import { v4 as uuidv4 } from "uuid";
import jwt from "jsonwebtoken";

class userAuthService {
  static async addUser({ name, email, password, description }) {
    const user = await User.findByEmail({ email });
    if (user) {
      const errorMessage =
        "이 이메일은 현재 사용중입니다. 다른 이메일을 입력해 주세요.";
      return { errorMessage };
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const id = uuidv4();
    const newUser = { id, name, email, description, password: hashedPassword };

    const createdNewUser = await User.create({ newUser });
    createdNewUser.errorMessage = null;

    return createdNewUser;
  }

  static async getUser({ email, password }) {
    const user = await User.findByEmail({ email });
    if (!user) {
      const errorMessage =
        "해당 이메일은 가입 내역이 없습니다. 다시 한 번 확인해 주세요.";
      return { errorMessage };
    }

    const correctPasswordHash = user.password;
    const isPasswordCorrect = await bcrypt.compare(
      password,
      correctPasswordHash
    );
    if (!isPasswordCorrect) {
      const errorMessage =
        "비밀번호가 일치하지 않습니다. 다시 한 번 확인해 주세요.";
      return { errorMessage };
    }

    const secretKey = process.env.JWT_SECRET_KEY || "jwt-secret-key";
    const token = jwt.sign({ user_id: user.id }, secretKey);

    const id = user.id;
    const name = user.name;
    const description = user.description;

    const loginUser = {
      token,
      id,
      email,
      name,
      description,
      errorMessage: null,
    };

    return loginUser;
  }

  static async getUsers() {
    const users = await User.findAll();
    return users;
  }

  static async getUsersNetwork(id) {
    const users = await User.findAllNetwork(id);
    return users;
  }

  static async getUserMaxLike() {
    const user = await User.findMaxLike();
    return user;
  }

  static async setUser({ user_id, toUpdate }) {
    let user = await User.findById({ user_id });

    if (!user) {
      const errorMessage = "가입 내역이 없습니다. 다시 한 번 확인해 주세요.";
      return { errorMessage };
    }

    if (toUpdate.name) {
      const fieldToUpdate = "name";
      const newValue = toUpdate.name;
      user = await User.update({ user_id, fieldToUpdate, newValue });
    }

    if (toUpdate.email) {
      const fieldToUpdate = "email";
      const newValue = toUpdate.email;
      user = await User.update({ user_id, fieldToUpdate, newValue });
    }

    if (toUpdate.password) {
      const fieldToUpdate = "password";
      const newValue = await bcrypt.hash(toUpdate.password, 10);
      user = await User.update({ user_id, fieldToUpdate, newValue });
    }

    if (toUpdate.description) {
      const fieldToUpdate = "description";
      const newValue = toUpdate.description;
      user = await User.update({ user_id, fieldToUpdate, newValue });
    }

    if (toUpdate.imageUploaded !== null) {
      const fieldToUpdate = "imageUploaded";
      const newValue = toUpdate.imageUploaded;
      user = await User.update({ user_id, fieldToUpdate, newValue });
    }

    if (toUpdate.likeCount) {
      const fieldToUpdate = "likeCount";
      const newValue = toUpdate.likeCount;
      user = await User.updateInc({ user_id, fieldToUpdate, newValue });
    }

    if (toUpdate.viewCount) {
      const fieldToUpdate = "viewCount";
      const newValue = toUpdate.viewCount;
      user = await User.updateInc({ user_id, fieldToUpdate, newValue });
    }

    return user;
  }

  static async getUserInfo({ user_id }) {
    const user = await User.findById({ user_id });

    if (!user) {
      const errorMessage =
        "해당 이메일은 가입 내역이 없습니다. 다시 한 번 확인해 주세요.";
      return { errorMessage };
    }

    return user;
  }
}

export { userAuthService };
