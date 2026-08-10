package com.notificationproject.notifications.turbo

import com.facebook.react.bridge.Arguments
import com.facebook.react.bridge.WritableMap
import com.notificationproject.notifications.model.NotificationRecord

fun NotificationRecord.toWritableMap(): WritableMap {
    return Arguments.createMap().apply {
        putString("id", id)
        putString("receivedAt", receivedAt)

        putString("title", title)
        putString("body", body)

        putBoolean("isRead", isRead)

        imageURL?.let {
            putString("imageURL", it)
        }

        deepLink?.let {
            putString("deepLink", it)
        }

        externalURL?.let {
            putString("externalURL", it)
        }
    }
}