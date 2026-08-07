import { PushNotification } from '../../domain/entities/PushNotification';
import NativeNotificationHistory from './NativeNotificationHistory';
import { mapNativeNotification } from './NotificationNativeMapper';

export class NotificationNativeStorage {
  getAll(): PushNotification[] {
    return NativeNotificationHistory.getNotifications().map(
      mapNativeNotification,
    );
  }

  markRead(id: string) {
    NativeNotificationHistory.markRead(id);
  }

  markAllRead() {
    NativeNotificationHistory.markAllRead();
  }

  clear() {
    NativeNotificationHistory.clear();
  }
}
