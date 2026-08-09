import { NotificationRepository } from '../../domain/repositories/NotificationRepository';
import { PushNotification } from '../../domain/entities/PushNotification';
import { NotificationNativeStorage } from '../native/NotificationNativeStorage';
import { NotificationRecord } from '../../../specs/NativeNotificationHistory';

export class NotificationRepositoryImpl implements NotificationRepository {
  constructor(private readonly storage: NotificationNativeStorage) {}

  getAll(): PushNotification[] {
    return this.storage.getAll();
  }

  markAsRead(id: string): void {
    this.storage.markAsRead(id);
  }

  markAllAsRead(): void {
    this.storage.markAllAsRead();
  }
}
