import express from 'express';
import { uploadFile, uploadMultiple, deleteFile } from '../controllers/upload.controller.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.use(protect);

router.post('/single', uploadFile);
router.post('/multiple', uploadMultiple);
router.delete('/', deleteFile);

export default router;
