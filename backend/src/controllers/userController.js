import { User, Role } from "../models/models.js";

class userController {
  async userResult(request, response) {
    try {
      
    } catch (e) {
      
    }
  }

  async getUsers(request, response) {
    try {
      const users = await User.find();
      response.json(users)
    } catch (e) {
      
    }
  }
};

export default new userController();