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
    const result = await cloudinary.v2.api.resource("avatars/hungszurjpgjz7jryelr");
    console.log(result);
  } catch (err) {
    console.error(err);
  }
};

export const getResourse = async (resourcePublicId: string) => {
  const result = await cloudinary.v2.api.resource(resourcePublicId);
  return result;
};

export const generateSignature = (data: object) => {
  // signature only valid in next 15mins
  const timestamp = Math.round(new Date().getTime() / 1000) - 45 * 60;

  const signature = cloudinary.v2.utils.api_sign_request(
    {
      timestamp: timestamp,
      ...data,
    },
    environment.CLOUDINARY_API_SECRET
  );

  return {
    timestamp,
    signature,
    cloudName: environment.CLOUDINARY_CLOUD_NAME,
    apiKey: environment.CLOUDINARY_API_KEY,
    data,
  };
};
