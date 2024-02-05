import axios from 'axios';
import config from '../config';

export const sendTelegram = (chatId: any, text: string) => {
  console.log('chatId::::: ', chatId);

  axios.get(
    `https://api.telegram.org/bot${config.telegram.bot_token}/sendMessage`,
    {
      params: {
        // chat_id: config.telegram.chat_id,
        chat_id: chatId,
        text: text,
      },
    },
  );
};
