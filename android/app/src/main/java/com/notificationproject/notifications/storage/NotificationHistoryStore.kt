package com.notificationproject.notifications.storage

import android.content.Context
import com.notificationproject.notifications.model.NotificationRecord
import kotlinx.serialization.encodeToString
import kotlinx.serialization.json.Json

class NotificationHistoryStore(
    context: Context,
) {

    private val preferences =
        context.getSharedPreferences(PREFERENCES_NAME, Context.MODE_PRIVATE)

    fun getAll(): List<NotificationRecord> =
        load()

    fun save(record: NotificationRecord) {
        val notifications = load().toMutableList()

        notifications.removeAll { it.id == record.id }
        notifications.add(0, record)

        save(notifications)
    }

    fun markAsRead(id: String) {
        val notifications =
            load().map {
                if (it.id == id) {
                    it.copy(isRead = true)
                } else {
                    it
                }
            }

        save(notifications)
    }

    fun markAllAsRead() {
        val notifications =
            load().map {
                it.copy(isRead = true)
            }

        save(notifications)
    }

    fun clear() {
        preferences.edit()
            .remove(KEY_HISTORY)
            .apply()
    }

    private fun load(): List<NotificationRecord> {
        val json =
            preferences.getString(KEY_HISTORY, null)
                ?: return emptyList()

        return runCatching {
            Json.decodeFromString<List<NotificationRecord>>(json)
        }.getOrElse {
            emptyList()
        }
    }

    private fun save(
        notifications: List<NotificationRecord>,
    ) {
        preferences.edit()
            .putString(
                KEY_HISTORY,
                Json.encodeToString(notifications),
            )
            .apply()
    }

    private companion object {
        const val PREFERENCES_NAME = "notification_history"

        const val KEY_HISTORY = "history"
    }
}