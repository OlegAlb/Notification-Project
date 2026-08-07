import { ChevronRight } from 'lucide-react-native';
import React, { FC, useMemo } from 'react';
import { Image, Pressable, Text, View } from 'react-native';

import { PushNotification } from '../../../domain/entities/PushNotification';
import { styles } from './NotificationCard.styles';
import { formatNotificationDate } from '../../../shared/utils/formatDate';

interface NotificationCardProps {
  notification: PushNotification;

  onPress: (notification: PushNotification) => void;
}

export const NotificationCard: FC<NotificationCardProps> = ({
  notification,
  onPress,
}) => {
  const hasImage = Boolean(notification.imageUrl);

  const hasAction = Boolean(notification.action);

  const isRead = notification.isRead;

  // console.log('notifications', notification);

  const formattedDate = useMemo(
    () => formatNotificationDate(notification.receivedAt),
    [notification.receivedAt],
  );

  const handlePress = () => {
    onPress(notification);
  };

  return (
    <Pressable style={styles.container} onPress={handlePress}>
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Text style={styles.title} numberOfLines={1}>
            {notification.title}
          </Text>

          <Text style={styles.body} numberOfLines={2}>
            {notification.body}
          </Text>
        </View>
        <View style={styles.headerRight}>
          <View style={styles.headerRow}>
            <Text style={styles.date}>{formattedDate}</Text>
            {hasAction && <ChevronRight size={18} color="#9CA3AF" />}
          </View>
          {!isRead && <View style={styles.unreadDot} />}
        </View>
      </View>

      {hasImage && (
        <Image
          source={{ uri: notification.imageUrl }}
          resizeMode="cover"
          style={styles.image}
        />
      )}
    </Pressable>
  );
};
