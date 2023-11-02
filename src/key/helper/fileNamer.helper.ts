import { v4 as uuidv4 } from 'uuid';

export const fileNamer = (
  req: Express.Request,
  file: Express.Multer.File,
  cb: (error: Error, filename: string) => void,
) => {
  const fileExptension = file.mimetype.split('/')[1];
  const fileName = `${uuidv4()}.${fileExptension}`;

  cb(null, fileName);
};
