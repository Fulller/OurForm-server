import { UploadService } from "../services/index.js";
import _ from "lodash";

const UploadController = {
  uploadImage: async function (req, res, next) {
    try {
      const imageBuffer = _.get(req, "file.buffer", null);
      const { url } = await UploadService.uploadImage(imageBuffer);
      return res.fly({ status: 200, metadata: { url } });
    } catch (err) {
      next(err);
    }
  },
  // uploadImage: async function (req, res, next) {
  //   try {
  //     const file = _.get(req, "file", null);
  //     return res.fly({ status: 200, metadata: { file } });
  //   } catch (err) {
  //     next(err);
  //   }
  // },
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
};
export default UploadController;
