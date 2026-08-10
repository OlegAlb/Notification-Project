import Foundation

@objc(NotificationStore)
public final class NotificationStore: NSObject {

    @objc static let shared = NotificationStore()

    private let suiteName = "group.org.reactjs.native.example.NotificationProject.onesignal"
    private let storageKey = "NotificationProject"

    private let lock = NSLock()

    private lazy var defaults: UserDefaults = {
        guard let defaults = UserDefaults(
            suiteName: suiteName
        ) else {
            fatalError(
                "[NotificationStore] Unable to create App Group UserDefaults"
            )
        }

        return defaults
    }()

    private let encoder: JSONEncoder = {
        let encoder = JSONEncoder()
        encoder.dateEncodingStrategy = .iso8601
        return encoder
    }()

    private let decoder: JSONDecoder = {
        let decoder = JSONDecoder()
        decoder.dateDecodingStrategy = .iso8601
        return decoder
    }()

    private override init() {
        super.init()
    }

    func save(_ notification: NotificationRecord) {
        lock.lock()
        defer {
            lock.unlock()
        }

        var notifications = getAllUnlocked()

        // Prevent duplicate notifications.
        if notifications.contains(where: {
            $0.id == notification.id
        }) {
            print(
                "[NotificationStore] Notification already exists:",
                notification.id
            )

            return
        }

        notifications.insert(
            notification,
            at: 0
        )

        saveAllUnlocked(notifications)

        print(
            "[NotificationStore] Saved notification:",
            notification.id
        )
    }


    func getAll() -> [NotificationRecord] {
        lock.lock()
        defer {
            lock.unlock()
        }

        return getAllUnlocked()
    }

    @objc(markAsRead:)
    func markAsRead(id: String) {
        lock.lock()
        defer {
            lock.unlock()
        }

        var notifications = getAllUnlocked()

        guard let index = notifications.firstIndex(
            where: {
                $0.id == id
            }
        ) else {
            return
        }

        notifications[index].isRead = true

        saveAllUnlocked(
            notifications
        )

        print(
            "[NotificationStore] Marked as read:",
            id
        )
    }

    @objc func markAllAsRead() {
        lock.lock()
        defer {
            lock.unlock()
        }

        var notifications = getAllUnlocked()

        notifications = notifications.map {
            var notification = $0
            notification.isRead = true
            return notification
        }

        saveAllUnlocked(
            notifications
        )

        print(
            "[NotificationStore] Marked all as read"
        )
    }


    @objc func getAllJSON() -> String {
        lock.lock()
        defer {
            lock.unlock()
        }

        let notifications = getAllUnlocked()

        do {
            let data = try encoder.encode(
                notifications
            )

            return String(
                data: data,
                encoding: .utf8
            ) ?? "[]"

        } catch {
            print(
                "[NotificationStore] Failed to encode:",
                error
            )

            return "[]"
        }
    }

    @objc func clear() {
        lock.lock()
        defer {
            lock.unlock()
        }

        defaults.removeObject(
            forKey: storageKey
        )

        print(
            "[NotificationStore] Storage cleared"
        )
    }

    private func getAllUnlocked() -> [NotificationRecord] {
        guard let data = defaults.data(
            forKey: storageKey
        ) else {
            return []
        }

        do {
            return try decoder.decode(
                [NotificationRecord].self,
                from: data
            )

        } catch {
            print(
                "[NotificationStore] Failed to decode:",
                error
            )

            return []
        }
    }

    private func saveAllUnlocked(
        _ notifications: [NotificationRecord]
    ) {
        do {
            let data = try encoder.encode(
                notifications
            )

            defaults.set(
                data,
                forKey: storageKey
            )

        } catch {
            print(
                "[NotificationStore] Failed to encode:",
                error
            )
        }
    }
}