import { PushNotification } from '../../domain/entities/PushNotification';
import NativeNotificationHistory from './NativeNotificationHistory';
import { mapNativeNotification } from './NotificationNativeMapper';

export class NotificationNativeStorage {
  getAll(): PushNotification[] {
    return NativeNotificationHistory.getNotifications().map(
      mapNativeNotification,
    );
  }

  markAsRead(id: string) {
    NativeNotificationHistory.markAsRead(id);
  }

  markAllAsRead() {
    NativeNotificationHistory.markAllAsRead();
  }
}
