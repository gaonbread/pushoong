import dotenv from 'dotenv';

dotenv.config({
  path: `${__dirname}/.env`,
});

const port = 4002;

export default {
  version: 'v0.0.1',
  port,
  telegram: {
    bot_token: process.env.BOT_TOKEN || '',
    chat_id: process.env.CHAT_ID || '',
  },
};
