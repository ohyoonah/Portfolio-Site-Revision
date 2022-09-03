import { UserModel } from "../schemas/user";

class User {
  static async create({ newUser }) {
    const createdNewUser = await UserModel.create(newUser);
    return createdNewUser;
  }

  static async findByEmail({ email }) {
    const user = await UserModel.findOne({ email });
    return user;
  }

  static async findById({ user_id }) {
    const user = await UserModel.findOne({ id: user_id });
    return user;
  }

  static async findAll() {
    const users = await UserModel.find({});
    return users;
  }

  static async findAllNetwork(id, page, perPage) {

    const user = await UserModel.aggregate([
      {
        $lookup: {
          from: 'likes',
          let: {
            id: "$id",
          },
          pipeline: [{
            $match: {
              $expr: {
                $and: [
                  { $eq: ["$targetUserId", "$$id" ] },
                  { $eq: ["$userId", id ] }
                ]
              }
            }
          }],
          as: 'like'
        },
      },
    ]).sort({ createdAt: "desc" })
      .skip(perPage * (page - 1))
      .limit(perPage);

    return user;
  }

  static async findMaxLike() {
    const users = await UserModel.find().sort({"likeCount":-1}).limit(1)
    return users;
  }


  static async update({ user_id, fieldToUpdate, newValue }) {
    const filter = { id: user_id };
    const update = { [fieldToUpdate]: newValue };
    const option = { returnOriginal: false };

    const updatedUser = await UserModel.findOneAndUpdate(
      filter,
      update,
      option
    );
    return updatedUser;
  }

  static async updateInc({ user_id, fieldToUpdate, newValue }) {
    const filter = { id: user_id };
    const update = { $inc: { [fieldToUpdate]: newValue } };
    const option = { returnOriginal: false };

    const updatedUser = await UserModel.findOneAndUpdate(
      filter,
      update,
      option
    );
    return updatedUser;
  }

}

export { User };
