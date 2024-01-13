import axios from 'axios';
import config from '../config';

export const sendTelegram = (text: any) => {
  axios.get(
    `https://api.telegram.org/bot${config.telegram.bot_token}/sendMessage`,
    {
      params: {
        chat_id: config.telegram.chat_id,
        text: text,
      },
    },
  );
  // fetch(
  //   `https://api.telegram.org/bot${config.telegram.bot_token}/sendMessage?chat_id=${config.telegram.chat_id}&text=${text}`,
  // );
};
