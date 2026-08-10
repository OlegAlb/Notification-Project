package com.notificationproject.notifications.model

import kotlinx.serialization.Serializable

@Serializable
data class NotificationRecord(
    val id: String,
    val receivedAt: String,

    val title: String,
    val body: String,

    val imageURL: String? = null,
    val deepLink: String? = null,
    val externalURL: String? = null,

    val isRead: Boolean = false,
)