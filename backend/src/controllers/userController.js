import { User, Role } from "../models/models.js";

class userController {
  async userResult(request, response) {
    try {
      
    } catch (e) {
      
    }
  }

  async getUsers(request, response) {
    try {

      const roleUser = new Role();
      const roleAdmin = new Role({value: 'ADMIN'});
      await roleUser.save();
      await roleAdmin.save(); 
      response.json("SERVER WORK - USER")
    } catch (e) {
      
    }
  }
};

export default new userController();