import { PushNotification } from '../entities/PushNotification';

export interface NotificationRepository {
  getAll(): PushNotification[];

  markRead(id: string): void;

  markAllRead(): void;

  clear(): void;
}
