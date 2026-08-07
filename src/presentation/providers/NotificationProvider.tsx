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

  markRead(id: string): Promise<void>;

  markAllRead(): Promise<void>;

  clear(): Promise<void>;
}

export const NotificationContext =
  createContext<NotificationContextValue | null>(null);

export function NotificationProvider({ children }: PropsWithChildren) {
  const [notifications, setNotifications] = useState<PushNotification[]>([]);

  const refresh = useCallback(async () => {
    const data = notificationRepository.getAll();

    setNotifications(data);
  }, []);

  const markRead = useCallback(
    async (id: string) => {
      const notification = notifications.find(item => item.id === id);

      if (!notification) {
        return;
      }

      notificationRepository.markRead(id);

      notificationNavigationHandler.handle(
        notification.action?.type,
        notification.action?.value,
      );

      await refresh();
    },
    [refresh],
  );

  const markAllRead = useCallback(async () => {
    notificationRepository.markAllRead();

    refresh();
  }, [refresh]);

  const clear = useCallback(async () => {
    notificationRepository.clear();

    refresh();
  }, [refresh]);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const value = useMemo(
    () => ({
      notifications,
      refresh,
      markRead,
      markAllRead,
      clear,
    }),
    [notifications, refresh, markRead, markAllRead, clear],
  );

  return (
    <NotificationContext.Provider value={value}>
      {children}
    </NotificationContext.Provider>
  );
}
