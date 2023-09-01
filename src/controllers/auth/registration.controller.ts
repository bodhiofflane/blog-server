import { Request, Response } from "express";
import { validationResult } from "express-validator";

import UserModel from "../../models/User.model.js";
import saveImgToDirAndReturnURL from "../../utils/saveImgToDirAndReturnURL.util.js";
import checkLoginForUniq from "../../utils/checkLoginForUniq.util.js";
import createHash from "../../utils/createHash.util.js";
import createJsonWebToken from "../../utils/createJsonWebToken.util.js";

import ValidationError from "../../errors/ValidationError.js";
import InternalServerError from '../../errors/InternalServerError.js';

const registration = async (req: Request, res: Response) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      throw new ValidationError(
        errors
          .array()
          .map((item) => item.msg)
          .join(". ")
      );
    }

    const username = await checkLoginForUniq(req.body.username);
    const password = await createHash(req.body.password);

    const lastName = req.body.lastName || "Фамилия";
    const firstName = req.body.firstName || "Имя";

    const avatarFile = req.files && req.files["avatar"] ? req.files["avatar"] : null;
    const avatarURL = await saveImgToDirAndReturnURL(avatarFile, "avatars");

    // Свойство id этого объекта - приведенное к строке свойство _id.
    const newUser = await UserModel.create({
      username,
      password,
      lastName,
      firstName,
      avatarURL,
    });

    const token = await createJsonWebToken(
      newUser.id,
      newUser.username as string,
      newUser.role
    );

    // Свойство id этого объекта - приведенное к строке свойство _id.
    return res.status(201).json({
      user: {
        id: newUser.id,
        username: newUser.username,
        role: newUser.role,
        avatarURL: newUser.avatarURL,
        createdAt: newUser.createdAt,
      },
      token,
      message: "Пользователь успешно создан",
    });
  } catch (error) {
    if (error instanceof ValidationError) {
      console.error(error.message);
      return res.status(400).json({message: error.message});
    }
    if (error instanceof InternalServerError) {
      console.error(error.message);
      return res.status(500).json({message: error.message});
    }
    if (error instanceof Error) {
      console.error(error.message);
      return res.status(500).json({ message: error.message });
    }
  }
};

export default registration;
