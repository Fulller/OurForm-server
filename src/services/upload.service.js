import { v2 as cloudinary } from "cloudinary";

import { extractPublicId } from "cloudinary-build-url";
import _ from "lodash";
import createHttpError from "http-errors";

const UploadService = {
  uploadImage: async function (imageBuffer) {
    try {
      if (!imageBuffer || !Buffer.isBuffer(imageBuffer)) {
        throw createHttpError(400, "Invalid image buffer");
      }
      return new Promise((resolve, reject) => {
        cloudinary.uploader
          .upload_stream(
            { resource_type: "image", folder: "our_form" },
            (error, result) => {
              if (error) {
                reject(createHttpError(error));
              } else {
                resolve(result);
              }
            }
          )
          .end(imageBuffer);
      });
    } catch (err) {
      throw createHttpError(err);
    }
  },
  deleteImage: async function (imageUrl) {
    try {
      const publicId = extractPublicId(imageUrl);
      if (!publicId) {
        throw createHttpError(400, "Public ID is required");
      }
      return new Promise((resolve, reject) => {
        cloudinary.uploader.destroy(publicId, (error, result) => {
          if (error) {
            reject(createHttpError(error));
          } else {
            resolve(result);
          }
        });
      });
    } catch (err) {
      throw createHttpError(err);
    }
  },
};

export default UploadService;