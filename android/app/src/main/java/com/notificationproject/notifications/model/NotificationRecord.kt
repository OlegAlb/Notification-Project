package com.notificationproject.notifications.model

import kotlinx.serialization.Serializable

@Serializable
data class NotificationRecord(
    val id: String,
    val title: String,
    val body: String,
    val receivedAt: Long,
    val imageUrl: String? = null,
    val actionType: String? = null,
    val actionValue: String? = null,
    val isRead: Boolean = false,
)