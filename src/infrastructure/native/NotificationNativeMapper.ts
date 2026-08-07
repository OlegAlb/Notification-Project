import { NotificationRecord } from '../../../specs/NativeNotificationHistory';

import {
  PushNotification,
  NotificationAction,
} from '../../domain/entities/PushNotification';

const mapAction = (record: NotificationRecord): NotificationAction => {
  if (!record.actionType || !record.actionValue) {
    return null;
  }

  switch (record.actionType) {
    case 'deeplink':
      return {
        type: 'deeplink',
        value: record.actionValue,
      };

    case 'url':
      return {
        type: 'url',
        value: record.actionValue,
      };

    default:
      return null;
  }
};

export function mapNativeNotification(
  record: NotificationRecord,
): PushNotification {
  return {
    id: record.id,

    title: record.title,

    body: record.body,

    receivedAt: record.receivedAt,

    imageUrl: record.imageUrl,

    action: mapAction(record),

    isRead: record.isRead,
  };
}

export function mapForegroundNotification(
  notification: any,
): NotificationRecord {
  const additionalData = notification.additionalData ?? {};

  return {
    id: notification.notificationId,

    title: notification.title ?? '',
    body: notification.body ?? '',

    receivedAt: Date.now(),

    imageUrl: notification.bigPicture,

    actionType: additionalData.actionType,
    actionValue: additionalData.actionValue,

    isRead: false,
  };
}
