const cloudinary = require("../config/cloudinary");
const asyncHandler = require("express-async-handler");

class UploadFileService {
  static uploadFile = asyncHandler(async (files, stem_name) => {
    if (!Array.isArray(files) || files.length === 0) {
      return [];
    }
    const uploadPromises = files.map(file => {
      // Kiểm tra nếu là base64, chuyển đổi thành buffer
      const buffer = file.base64 ? Buffer.from(file.base64.split(',')[1], 'base64') : file.buffer;
  
      return new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          { folder: stem_name },
          (error, result) => {
            if (error) {
              reject(error);
            } else {
              resolve({
                image_url: result.secure_url,
                thumb_url: cloudinary.url(result.public_id, {
                  height: 500,
                  width: 500,
                  crop: "thumb",
                  format: "jpg",
                })
              });
            }
          }
        );
        uploadStream.end(buffer);
      });
    });
  
    try {
      const uploadUrls = await Promise.all(uploadPromises);
      return uploadUrls;
    } catch (error) {
      console.error("Upload failed:", error);
      throw error;
    }
  });
  
  static uploadLessonFile = asyncHandler(async (files, title) => {
    if (!Array.isArray(files) || files.length === 0) {
      return [];
    }

    const uploadPromises = files.map(file => {
      const buffer = file.base64 
        ? Buffer.from(file.base64.split(',')[1], 'base64') 
        : file.buffer;

      return new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          {
            folder: title,
            resource_type: "auto", // Tự động phát hiện loại file (ảnh, PDF, video...)
          },
          (error, result) => {
            if (error) {
              reject(error);
            } else {
              resolve({
                file_url: result.secure_url,
                public_id: result.public_id,
              });
            }
          }
        );
        uploadStream.end(buffer);
      });
    });

    try {
      const uploadResults = await Promise.all(uploadPromises);
      return uploadResults;
    } catch (error) {
      console.error("Upload failed:", error);
      throw error;
    }
  });
}

module.exports = UploadFileService;