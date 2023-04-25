import { Router } from 'express';
import { fileController } from '../controllers/fileController';
import { multerMiddleware } from '../middlewares/multerMiddleware';
import { authMiddleWare } from '../middlewares/authMiddleware';

export const fileRouter = Router({});

fileRouter.post(
  '/upload',
  multerMiddleware.single('filedata'),
  fileController.uploadFile
);
fileRouter.get('/list', fileController.getListFiles);
fileRouter.delete('/delete/:id', authMiddleWare, fileController.deleteFile);
fileRouter.get('/:id', fileController.getFileInformation);
fileRouter.get('/download/:id', authMiddleWare, fileController.downloadFile);
fileRouter.put('/update/:id', authMiddleWare, fileController.updateFile);
