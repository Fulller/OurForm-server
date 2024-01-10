import { v2 as cloudinary } from "cloudinary";

import { extractPublicId } from "cloudinary-build-url";
import _ from "lodash";
import createHttpError from "http-errors";
import config from "../configs/index.js";

const folder = config.cloudinary.folder;

const UploadService = {
  uploadImage: async function (imageFile) {
    const imageBuffer = imageFile.buffer;
    try {
      if (!imageBuffer || !Buffer.isBuffer(imageBuffer)) {
        throw createHttpError(400, "Invalid image buffer");
      }
      return new Promise((resolve, reject) => {
        cloudinary.uploader
          .upload_stream(
            { resource_type: "image", folder: folder },
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
  // uploadFile: async function (file) {
  //   const { buffer, mimetype } = file;
  //   try {
  //     if (!buffer || !Buffer.isBuffer(buffer)) {
  //       throw createHttpError(400, "Invalid buffer");
  //     }
  //     return new Promise((resolve, reject) => {
  //       cloudinary.uploader
  //         .upload_stream(
  //           { resource_type: "auto", folder: folder },
  //           (error, result) => {
  //             if (error) {
  //               reject(createHttpError(error));
  //             } else {
  //               resolve(result);
  //             }
  //           }
  //         )
  //         .end(buffer);
  //     });
  //   } catch (err) {
  //     throw createHttpError(err);
  //   }
  // },
  // deleteFile: async function (url) {
  //   try {
  //     const publicId = extractPublicId(url);
  //     const config = getConfig(url);
  //     console.log({ config });
  //     console.log({ publicId });
  //     if (!publicId) {
  //       throw createHttpError(400, "Public ID is required");
  //     }
  //     return new Promise((resolve, reject) => {
  //       cloudinary.uploader.destroy(
  //         publicId,
  //         { resource_type: "video" },
  //         (error, result) => {
  //           if (error) {
  //             reject(createHttpError(error));
  //           } else {
  //             resolve(result);
  //           }
  //         }
  //       );
  //     });
  //   } catch (err) {
  //     throw createHttpError(err);
  //   }
  // },
};

export default UploadService;
