import { UploadService } from "../services/index.js";
import _ from "lodash";

const UploadController = {
  uploadImage: async function (req, res, next) {
    try {
      const imageFile = _.get(req, "file", null);
      const { url } = await UploadService.uploadImage(imageFile);
      return res.fly({ status: 200, metadata: { url } });
    } catch (err) {
      next(err);
    }
  },
  deleteImage: async function (req, res, next) {
    try {
      const imageUrl = _.get(req, "body.image_url", null);
      const result = await UploadService.deleteImage(imageUrl);
      return res.fly({
        status: 200,
        message: "Delete image successfuly",
        metadata: result,
      });
    } catch (err) {
      next(err);
    }
  },
  // uploadFile: async function (req, res, next) {
  //   try {
  //     const file = _.get(req, "file", null);
  //     const result = await UploadService.uploadFile(file);
  //     return res.fly({
  //       status: 200,
  //       message: "Upload file succesfuly!",
  //       metadata: result,
  //     });
  //   } catch (err) {
  //     next(err);
  //   }
  // },
  // deleteFile: async function (req, res, next) {
  //   try {
  //     const url = _.get(req, "body.url", null);
  //     const result = await UploadService.deleteFile(url);
  //     return res.fly({
  //       status: 200,
  //       message: "Delete file successfuly",
  //       metadata: result,
  //     });
  //   } catch (err) {
  //     next(err);
  //   }
  // },
};
export default UploadController;
