export const fileFilter = (
  req: Express.Request,
  file: Express.Multer.File,
  cb: (error: Error | null, acceptFile: boolean) => void,
) => {
  if (!file) return cb(new Error('No se ha encontrado el archivo'), false);

  const fileExptension = file.mimetype.split('/')[1];
  const validExtensions = ['jpg', 'jpeg', 'png', 'webp'];

  if (!validExtensions.includes(fileExptension))
    return cb(new Error('El archivo no es una imagen'), false);

  cb(null, true);
};
