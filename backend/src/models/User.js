import { Schema, model } from 'mongoose';

const User = new Schema (
  {
    role: {type: String, ref: 'Role'},
    name: {type: String, required: true},
    username: {type: String, unique: true, required: true},
    password: {type: String, required: true}
  }
)

export default model('User', User);