import dotenv from 'dotenv';

dotenv.config({
  path: `${__dirname}/.env`,
});

export default {
  version: 'v0.0.1',
  port: process.env.PORT || 3000,
  allow_ip: process.env.ALLOW_IP || '',
  telegram: {
    bot_token: process.env.BOT_TOKEN || '',
    chat_id: process.env.CHAT_ID || '',
  },
};
