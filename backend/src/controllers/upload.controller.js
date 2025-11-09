import { uploadToCloudinary, deleteFromCloudinary } from '../config/cloudinary.js';

export const uploadFile = async (req, res, next) => {
  try {
    if (!req.files || !req.files.file) {
      return res.status(400).json({ success: false, message: 'No file uploaded' });
    }

    const file = req.files.file;
    const folder = req.body.folder || 'general';

    const result = await uploadToCloudinary(file, folder);

    res.json({ success: true, data: result });
  } catch (error) {
    next(error);
  }
};

export const uploadMultiple = async (req, res, next) => {
  try {
    if (!req.files) {
      return res.status(400).json({ success: false, message: 'No files uploaded' });
    }

    const folder = req.body.folder || 'general';
    const files = Array.isArray(req.files.files) ? req.files.files : [req.files.files];

    const uploadPromises = files.map(file => uploadToCloudinary(file, folder));
    const results = await Promise.all(uploadPromises);

    res.json({ success: true, data: results });
  } catch (error) {
    next(error);
  }
};

export const deleteFile = async (req, res, next) => {
  try {
    const { publicId } = req.body;

    if (!publicId) {
      return res.status(400).json({ success: false, message: 'Public ID is required' });
    }

    await deleteFromCloudinary(publicId);

    res.json({ success: true, message: 'File deleted successfully' });
  } catch (error) {
    next(error);
  }
};
