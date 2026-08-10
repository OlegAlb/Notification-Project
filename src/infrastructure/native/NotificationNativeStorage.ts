import { PushNotification } from '../../domain/entities/PushNotification';
import NativeNotificationHistory from './NativeNotificationHistory';

export class NotificationNativeStorage {
  getAll(): PushNotification[] {
    return NativeNotificationHistory.getNotifications();
  }

  markAsRead(id: string) {
    NativeNotificationHistory.markAsRead(id);
  }

  markAllAsRead() {
    NativeNotificationHistory.markAllAsRead();
  }
}
