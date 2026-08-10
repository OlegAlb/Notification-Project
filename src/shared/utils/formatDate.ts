import dayjs from 'dayjs';

export const formatNotificationDate = (date: string) => {
  return dayjs(date).format('DD.MM.YYYY HH:mm');
};
