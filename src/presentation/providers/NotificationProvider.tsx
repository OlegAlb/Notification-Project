import React, {
  createContext,
  PropsWithChildren,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';

import { PushNotification } from '../../domain/entities/PushNotification';
import {
  notificationNavigationHandler,
  notificationRepository,
} from '../../app/container';

interface NotificationContextValue {
  notifications: PushNotification[];

  refresh(): Promise<void>;

  markAsRead(id: string): Promise<void>;

  markAllAsRead(): Promise<void>;
}

export const NotificationContext =
  createContext<NotificationContextValue | null>(null);

export function NotificationProvider({ children }: PropsWithChildren) {
  const [notifications, setNotifications] = useState<PushNotification[]>([]);

  const refresh = useCallback(async () => {
    const data = notificationRepository.getAll();

    setNotifications(data);
  }, []);

  const markAsRead = useCallback(
    async (id: string) => {
      const notification = notifications.find(item => item.id === id);

      if (!notification) {
        return;
      }

      notificationRepository.markAsRead(id);

      notificationNavigationHandler.handle(
        notification.action?.type,
        notification.action?.value,
      );

      await refresh();
    },
    [refresh],
  );

  const markAllAsRead = useCallback(async () => {
    notificationRepository.markAllAsRead();

    refresh();
  }, [refresh]);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const value = useMemo(
    () => ({
      notifications,
      refresh,
      markAsRead,
      markAllAsRead,
    }),
    [notifications, refresh, markAsRead, markAllAsRead],
  );

  return (
    <NotificationContext.Provider value={value}>
      {children}
    </NotificationContext.Provider>
  );
}
