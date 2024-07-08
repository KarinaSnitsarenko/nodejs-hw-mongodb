import cloudinary from 'cloudinary';
import { ENV_VARS } from '../contacts/index.js';
import { env } from './env';
import fs from 'node:fs/promises';

cloudinary.v2.config({
  secure: true,
  cloud_name: env(ENV_VARS.CLOUD_NAME),
  api_key: env(ENV_VARS.API_KEY),
  api_secret: env(ENV_VARS.API_SECRET),
});

export const saveFileToCloudinary = async (file) => {
  const response = await cloudinary.uploader.upload(file.path);
  await fs.unlink(file.path);

  return response.secure_url;
};
