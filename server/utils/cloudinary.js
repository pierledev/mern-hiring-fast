import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv';

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const handleUpload = async (file) => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload(file, {
      resource_type: 'image',
      upload_preset: 'hiring_fast',
      folder: 'hiring_fast',
      max_bytes: 1000000,
      crop: 'limit',
    }, (error, result) => {
      if (error) {
        reject(error);
      } else {
        resolve({ public_id: result.public_id, url: result.secure_url });
      }
    });
  });
};

export const handleDeleteImage = async (userPicturePublicId) => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.destroy(userPicturePublicId, (error, result) => {
      if (error) {
        reject(error);
      } else {
        resolve(result);
      }
    });
  });
};


// Helper function to extract public_id from Cloudinary URL
export const getPublicId = (url) => {
  const parts = url.split('/');
  const fileName = parts[parts.length - 1];
  const publicId = fileName.split('.')[0];
  return publicId;
};
