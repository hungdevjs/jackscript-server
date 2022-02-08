import cloudinary from "cloudinary";

import environment from "../utils/environment";

cloudinary.v2.config({
  cloud_name: environment.CLOUDINARY_CLOUD_NAME,
  api_key: environment.CLOUDINARY_API_KEY,
  api_secret: environment.CLOUDINARY_API_SECRET,
  secure: true,
});

export const getSamples = async () => {
  try {
    const result = await cloudinary.v2.api.resources_by_ids("samples/landscapes/landscape-panorama");
    console.log(result);
  } catch (err) {
    console.error(err);
  }
};

export const generateSignature = (folder: string = "", eager: string = "c_pad,h_300,w_400|c_crop,h_200,w_260") => {
  const timestamp = Math.round(new Date().getTime() / 1000);

  const signature = cloudinary.v2.utils.api_sign_request(
    {
      timestamp: timestamp,
      eager,
      folder,
    },
    environment.CLOUDINARY_API_SECRET
  );

  return { timestamp, signature, cloudName: environment.CLOUDINARY_CLOUD_NAME, apiKey: environment.CLOUDINARY_API_KEY };
};
