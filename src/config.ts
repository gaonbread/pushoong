import dotenv from 'dotenv';

dotenv.config();

export default {
  version: 'v0.0.4',
  port: process.env.PORT || 3000,
  allow_ip: process.env.ALLOW_IP || '',
  mongo_uri: process.env.MONGO_URI || '',
};
