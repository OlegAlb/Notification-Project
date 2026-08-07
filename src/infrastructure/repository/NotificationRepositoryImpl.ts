import { NotificationRepository } from '../../domain/repositories/NotificationRepository';
import { PushNotification } from '../../domain/entities/PushNotification';
import { NotificationNativeStorage } from '../native/NotificationNativeStorage';
import { NotificationRecord } from '../../../specs/NativeNotificationHistory';

export class NotificationRepositoryImpl implements NotificationRepository {
  constructor(private readonly storage: NotificationNativeStorage) {}

  getAll(): PushNotification[] {
    return this.storage.getAll();
  }

  markRead(id: string): void {
    this.storage.markRead(id);
  }

  markAllRead(): void {
    this.storage.markAllRead();
  }

  clear(): void {
    this.storage.clear();
  }
}
