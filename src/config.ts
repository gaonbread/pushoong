import dotenv from 'dotenv';

dotenv.config();

export default {
  version: 'v0.0.3',
  port: process.env.PORT || 3000,
  allow_ip: process.env.ALLOW_IP || '',
  telegram: {
    bot_token: process.env.BOT_TOKEN || '',
    chat_id: process.env.CHAT_ID || '',
  },
  mongo_uri: process.env.MONGO_URI || '',
};
