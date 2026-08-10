package com.notificationproject.notifications.mapper

import java.util.UUID
import java.net.URI
import java.time.Instant
import com.notificationproject.notifications.model.NotificationRecord
import com.onesignal.notifications.INotification

object NotificationMapper {

    fun from(notification: INotification): NotificationRecord {
        val actionType = notification.additionalData
            ?.optString("actionType")
            ?.takeIf { it.isNotEmpty() }

        val actionValue = notification.additionalData
            ?.optString("actionValue")
            ?.takeIf { it.isNotEmpty() }

        var deepLink: String? = null
        var externalURL: String? = null

        if (!actionValue.isNullOrEmpty()) {
            when (actionType?.lowercase()) {
                "deeplink" -> {
                    deepLink = actionValue
                }

                "url" -> {
                    if (isHTTPURL(actionValue)) {
                        externalURL = actionValue
                    }
                }

                else -> {
                    if (isHTTPURL(actionValue)) {
                        externalURL = actionValue
                    } else {
                        deepLink = actionValue
                    }
                }
            }
        }

        return NotificationRecord(
            id = notification.notificationId
                ?: UUID.randomUUID().toString(),

            receivedAt = Instant.now().toString(),

            title = notification.title.orEmpty(),
            body = notification.body.orEmpty(),

            imageURL = notification.bigPicture,

            deepLink = deepLink,
            externalURL = externalURL,

            isRead = false,
        )
    }

    private fun isHTTPURL(value: String): Boolean {
        return runCatching {
            val uri = URI(value)

            uri.scheme.equals("http", ignoreCase = true) ||
                uri.scheme.equals("https", ignoreCase = true)
        }.getOrDefault(false)
    }
}