import fs from 'fs';
import multer from 'multer';
import path from 'path';
import { FesError } from 'fesjs';
import { Request } from 'express';
// Setup multer
const uploadPath = process.env.UPLOAD_PATH;
const MIME_TYPE_MAP = [
  /image\/(jpg|jpeg|png|gif)/,
  /video\/*/,
  /audio\/*/,
  /\.zip/,
  /text\/*/,
  /application\/*/,
];

// Storage
export const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const now = new Date();
    const { user } = req as any;
    const arr = [];
    // Prepare upload dir
    if (user) {
      const userPath = user.username;
      const timePath = `${now.getFullYear()}-${now.getMonth() + 1}`;
      arr.push('private', userPath, timePath);
    } else {
      arr.push('anonymus');
    }
    let uPath = '';
    arr.forEach((e) => {
      uPath = path.join(uPath, e);
      const pp = path.join(uploadPath, uPath);
      if (!fs.existsSync(pp)) {
        fs.mkdirSync(pp, '774');
      }
    });
    cb(null, path.join(uploadPath, ...arr));
  },
  filename: (req, file, cb) => {
    const { name, ext } = path.parse(file.originalname);
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const filename = `${uniqueSuffix}-${name}${ext}`;
    cb(null, filename);
  },
});

function fileFilter(req: Request, file: Express.Multer.File, cb) {
  if (!MIME_TYPE_MAP.find((mimetype) => mimetype.test(file.mimetype))) {
    return cb(new FesError('File not Support', 500), false);
  }
  cb(null, true);
}

export default multer({ storage, fileFilter });
