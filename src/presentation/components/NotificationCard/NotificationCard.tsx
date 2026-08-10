import { ChevronRight } from 'lucide-react-native';
import React, { FC, useMemo } from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';

import { PushNotification } from '../../../domain/entities/PushNotification';
import { formatNotificationDate } from '../../../shared/utils/formatDate';
import { styles } from './NotificationCard.styles';

interface NotificationCardProps {
  notification: PushNotification;

  onPress: (notification: PushNotification) => void;
}

export const NotificationCard: FC<NotificationCardProps> = ({
  notification,
  onPress,
}) => {
  const hasImage = Boolean(notification.imageURL);

  const hasAction = Boolean(notification.externalURL || notification.deepLink);

  const isRead = notification.isRead;

  const formattedDate = useMemo(
    () => formatNotificationDate(notification.receivedAt),
    [notification.receivedAt],
  );

  const handlePress = () => {
    onPress(notification);
  };

  return (
    <TouchableOpacity style={styles.container} onPress={handlePress}>
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
          source={{ uri: notification.imageURL! }}
          resizeMode="cover"
          style={styles.image}
        />
      )}
    </TouchableOpacity>
  );
};
