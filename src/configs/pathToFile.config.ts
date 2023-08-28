import path from 'path';

const relativePathToImgs = path.join('uploads', 'img');
const absPathToImgs = path.resolve(relativePathToImgs);

export {relativePathToImgs, absPathToImgs}