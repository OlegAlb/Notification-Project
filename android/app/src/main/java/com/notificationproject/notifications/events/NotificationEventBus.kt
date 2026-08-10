package com.notificationproject.notifications.events

import com.notificationproject.notifications.model.NotificationRecord

object NotificationEventBus {

    private val receivedListeners =
        mutableSetOf<(NotificationRecord) -> Unit>()

    private val clickedListeners =
        mutableSetOf<(NotificationRecord) -> Unit>()

    fun subscribeReceived(
        listener: (NotificationRecord) -> Unit,
    ) {
        receivedListeners += listener
    }

    fun unsubscribeReceived(
        listener: (NotificationRecord) -> Unit,
    ) {
        receivedListeners -= listener
    }

    fun emitReceived(
        notification: NotificationRecord,
    ) {
        receivedListeners.forEach { listener ->
            listener(notification)
        }
    }

    fun subscribeClicked(
        listener: (NotificationRecord) -> Unit,
    ) {
        clickedListeners += listener
    }

    fun unsubscribeClicked(
        listener: (NotificationRecord) -> Unit,
    ) {
        clickedListeners -= listener
    }

    fun emitClicked(
        notification: NotificationRecord,
    ) {
        clickedListeners.forEach { listener ->
            listener(notification)
        }
    }
}