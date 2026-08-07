package com.notificationproject.notifications.turbo

import com.facebook.react.bridge.Arguments
import com.facebook.react.bridge.WritableMap
import com.notificationproject.notifications.model.NotificationRecord

fun NotificationRecord.toWritableMap(): WritableMap {
    return Arguments.createMap().apply {
        putString("id", id)
        putString("title", title)
        putString("body", body)

        putDouble(
            "receivedAt",
            receivedAt.toDouble(),
        )

        putBoolean("isRead", isRead)

        imageUrl?.let {
            putString("imageUrl", it)
        }

        actionType?.let {
            putString("actionType", it)
        }

        actionValue?.let {
            putString("actionValue", it)
        }
    }
}