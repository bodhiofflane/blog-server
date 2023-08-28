import {Schema, model} from 'mongoose';

import User from '../types/User.type.js';

const userSchema = new Schema(
  {
    username: {
      type: String,
      require: true,
      unique: true,
      minLength: 3,
      maxLength: 20,
    },
    password: {
      type: String,
      require: true,
      minLength: 5,
      maxLength: 100,
    },
    // Поле будет свидетельствовать -> Подтвердил пользователь почту или нет
    /*  isActivated: {
      type: Boolean,
      default: false,
    }, */
    // Здесь будет хранится ссылка для активации. Строковое, необязательное значение.
    /* activationLink: {
      type: String,
    }, */
    firstName: {
      type: String,
      minLength: 2,
      maxLength: 15,
      default: 'Имя',
    },
    lastName: {
      type: String,
      minLength: 2,
      maxLength: 15,
      default: 'Фамилия',
    },
    avatarURL: {
      type: String,
      default: '',
    },
    role: {
      type: String,
      // Enum - значения в массиве
      enum: ['user', 'moderator', 'admin', 'locked'],
      default: 'user',
    },
  },
  {timestamps: true, versionKey: false}
);

export default model('User', userSchema);
