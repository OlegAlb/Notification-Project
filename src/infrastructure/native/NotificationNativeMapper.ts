import { NotificationRecord } from '../../../specs/NativeNotificationHistory';
import { PushNotification } from '../../domain/entities/PushNotification';

export function mapNativeNotification(
  record: NotificationRecord,
): PushNotification {
  return {
    id: record.id,
    title: record.title,
    body: record.body,
    receivedAt: record.receivedAt,
    imageURL: record.imageURL,
    deepLink: record.deepLink,
    externalURL: record.externalURL,
    isRead: record.isRead,
  };
}
