export const sendSlack = ({
  token,
  channel_id,
  message,
}: {
  token: string;
  channel_id: string;
  message: string;
}) => {
  console.log('slack으로 보내기::: ', message);
};
