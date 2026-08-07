package com.notificationproject.notifications.mapper

import java.util.UUID
import com.notificationproject.notifications.model.NotificationRecord
import com.onesignal.notifications.INotification

object NotificationMapper {

    fun from(notification: INotification): NotificationRecord {
        return NotificationRecord(
            id = notification.notificationId
                ?: UUID.randomUUID().toString(),
                
            title = notification.title.orEmpty(),
            body = notification.body.orEmpty(),
            receivedAt = System.currentTimeMillis(),

            imageUrl = notification.bigPicture,

            actionType = notification.additionalData
                ?.optString("actionType")
                ?.takeIf { it.isNotEmpty() },
            actionValue = notification.additionalData
                ?.optString("actionValue")
                ?.takeIf { it.isNotEmpty() },

            isRead = false,
        )
    }
}