import { extname } from 'path';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { applyDecorators, UseInterceptors } from '@nestjs/common';
import { FolderPath } from 'src/enums/folder.enum';

type UploadFile = 'photo';

export function LocalFileInterceptor(fieldName: UploadFile = 'photo') {
  return applyDecorators(
    UseInterceptors(
      FileInterceptor(fieldName, {
        storage: diskStorage({
          destination: FolderPath.UPLOAD,
          filename: (req, file, cb) => {
            const uniqueName = Date.now() + extname(file.originalname);
            cb(null, uniqueName);
          },
        }),
      }),
    ),
  );
}
