import { PushNotification } from '../entities/PushNotification';

export interface NotificationRepository {
  getAll(): PushNotification[];

  markAsRead(id: string): void;

  markAllAsRead(): void;
}
