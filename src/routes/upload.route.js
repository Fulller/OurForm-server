import { Router } from "express";
import { UploadController } from "../controllers/index.js";
import { upload } from "../helpers/multer.helper.js";

const UploadRouter = Router();

UploadRouter.post(
  "/image",
  upload.single("image"),
  UploadController.uploadImage
);
UploadRouter.post("/image/delete", UploadController.deleteImage);
// UploadRouter.post("/file", upload.single("file"), UploadController.uploadFile);
// UploadRouter.post("/file/delete", UploadController.deleteFile);

export default UploadRouter;
