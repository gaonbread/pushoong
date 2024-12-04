import axios from 'axios';

export const sendSlack = ({
  token,
  channel_id,
  message,
}: {
  token: string;
  channel_id: string;
  message: any;
}) => {
  console.log('slack => ', token, channel_id);

  try {
    axios
      .post(
        `https://slack.com/api/chat.postMessage?channel=${channel_id}&blocks=${message}&pretty=1`,
        null,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      )
      .then((res) => {
        console.log('슬랙 response =>', res.data);
      });

    console.log('slack message =>', token, channel_id, message);
  } catch (error) {
    console.log('slack 보내기 실패 => ', error);
    throw error;
  }
};
