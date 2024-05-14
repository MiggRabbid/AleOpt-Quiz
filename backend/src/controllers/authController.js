import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import { validationResult } from 'express-validator';
import jwt from 'jsonwebtoken';


import { User, Role } from "../models/models.js";

dotenv.config();

const secret = process.env.SECRET_KEY;

const getAccessToken = (id, role, username) => {
  const payload = {
    id, role, username
  }
  return jwt.sign(payload, secret, {expiresIn: '24H'})
}

class authController {
  async signup(request, response) {
    try {
      const validationError = validationResult(request)

      if (!validationError.isEmpty()) {
        return response.status(400).json({ message: validationError.errors[0].msg, validationError });
      }

      const { name, username, password, role } = request.body;

      const candidate = await User.findOne({ username });

      if (candidate) {
        return response.status(400).json({ message: 'This user exists' });
      }

      const hashPassword = bcrypt.hashSync(password, 5);
      const userRole = await Role.findOne({ value: role.toUpperCase() });

      const newUser = new User({ name, username, password: hashPassword, role: userRole.value });
      console.log('new user -', newUser);
      await newUser.save();

      return response.json({ message: 'User successfully registered' })
    } catch (e) {
      console.log(e);
      response.status(400).json({ message: 'Registration error' })
    }
  }

  async login(request, response) {
    try {
      const validationError = validationResult(request)

      if (!validationError.isEmpty()) {
        console.log(validationError)
        return response.status(400).json({ message: validationError.errors[0].msg, validationError });
      }

      const { username, password } = request.body;
      const user = await User.findOne({username});

      if (!user) {
        return response.status(400).json({ message: `User ${username} not found`});
      }

      const isValidPassword = bcrypt.compareSync(password, user.password);

      if (!isValidPassword) {
        return response.status(400).json({ message: `Incorrect password entered`});
      }

      const token = getAccessToken(user._id, user.role, user.username)

      return response.json({token});
    } catch (e) {
      console.log(e);
      response.status(400).json({ message: 'Authorization error' });
    }
  }

  async isLogin(request, response) {
    try {
      response.json("SERVER WORK - AUTH");
    } catch (e) {
      console.log(e);
      response.status(400).json({ message: 'isLogin error' });
    }
  }
};

export default new authController();