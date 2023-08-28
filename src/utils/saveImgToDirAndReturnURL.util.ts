import path from 'node:path';
import mime from 'mime';
import {nanoid} from 'nanoid/async';

import { absPathToImgs, relativePathToImgs } from '../configs/pathToFile.config.js';

import {UploadedFile} from 'express-fileupload';


const saveImgToDirAndReturnURL = async (
  imgFile: UploadedFile | UploadedFile[] | null,
  saveDir: 'avatars' | 'posts'
): Promise<string> => {
  try {
    if (!imgFile || Array.isArray(imgFile)) return '';

    if (
      imgFile.mimetype !== mime.getType('jpeg') &&
      imgFile.mimetype !== mime.getType('webp')
    ) {
      throw new Error(
        'Можно добавить изображение только с расширеимем .jpeg или .wepb'
      );
    }

    const avatarName = await nanoid();
    const avatarExt = '.' + mime.getExtension(imgFile.mimetype);
    const avatarURL = avatarName + avatarExt;
    const pathToSave = path.join(absPathToImgs, saveDir);
    await imgFile.mv(path.join(pathToSave, avatarURL));

    return '/' + path.join(relativePathToImgs, saveDir, avatarURL);
  } catch (error) {
    throw error;
  }
};

export default saveImgToDirAndReturnURL;
