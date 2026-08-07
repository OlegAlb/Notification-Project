import dayjs from 'dayjs';

export const formatNotificationDate = (timestamp: number) => {
  return dayjs(timestamp).format('DD.MM.YYYY HH:mm');
};
