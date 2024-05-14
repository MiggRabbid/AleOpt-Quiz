import bcrypt from 'bcryptjs';

import { User, Role } from "../models/models.js";

class authController {
  async signup(request, response) {
    try {
      const { name, username, password, role } = request.body

      const candidate = await User.findOne({ username })

      if (candidate) {
        console.log(e)
        return response.status(400).json({message: 'This user exists'})
      }

      const hashPassword = bcrypt.hashSync(password, 5);
      const userRole = await Role.findOne({value: role.toUpperCase()});

      const newUser = new User({name, username, password: hashPassword, role: userRole.value});
      console.log('new user -', newUser);
      await newUser.save()

      return response.json({message: 'User successfully registered'})
    } catch (e) {
      console.log(e)
      response.status(400).json({message: 'Registration error'})
    }
  }

  async login(request, response) {
    try {
      
    } catch (e) {
      console.log(e)
      response.status(400).json({message: 'Authorization error'})
    }
  }

  async isLogin(request, response) {
    try {
      response.json("SERVER WORK - AUTH")
    } catch (e) {
      console.log(e)
      response.status(400).json({message: 'isLogin error'})
    }
  }
};

export default new authController();