import multer from "multer";
import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";

const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 10,
  },
});
const storageCloudinary = new CloudinaryStorage({
  cloudinary: cloudinary,
  folder: "our_form",
});
const uploadCloudinary = multer({
  storage: storageCloudinary,
});
export { upload, uploadCloudinary };
