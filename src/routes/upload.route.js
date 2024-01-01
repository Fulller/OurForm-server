import { Router } from "express";
import { UploadController } from "../controllers/index.js";
import { uploadCloudinary, upload } from "../helpers/multer.helper.js";

const UploadRouter = Router();

UploadRouter.post(
  "/image",
  upload.single("image"),
  UploadController.uploadImage
);
// UploadRouter.post(
//   "/image",
//   uploadCloudinary.single("image"),
//   UploadController.uploadImage
// );
UploadRouter.post("/image/delete", UploadController.deleteImage);

export default UploadRouter;
