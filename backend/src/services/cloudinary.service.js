const cloudinary = require("../config/cloudinary");

const uploadImage = async (file) => {
  const dataUri = `data:${file.mimetype};base64,${file.buffer.toString("base64")}`;
  const uploadResult = await cloudinary.uploader.upload(dataUri, {
    folder: "swiftshop/products",
  });
  return uploadResult.secure_url;
};

const uploadImages = async (files) => {
  return await Promise.all(files.map(uploadImage));
};

module.exports = { uploadImage, uploadImages };
