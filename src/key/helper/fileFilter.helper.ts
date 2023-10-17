export const fileFilter = (
  req: Express.Request,
  file: Express.Multer.File,
  callback: (error: Error, acceptFile: boolean) => void,
) => {
  if (!file)
    return callback(new Error('No se ha seleccionado un archivo'), false);

  if (file.size > 1024 * 1024 * 5)
    return callback(new Error('El archivo es muy pesado'), false);

  const fileExtension = file.mimetype.split('/')[1];
  const allowedExtensions = ['png', 'jpg', 'jpeg', 'webp'];

  if (allowedExtensions.includes(fileExtension)) {
    return callback(null, true);
  }

  callback(null, false);
};
