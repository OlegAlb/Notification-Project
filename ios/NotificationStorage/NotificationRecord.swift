import Foundation

struct NotificationRecord: Codable {
    let id: String
    let receivedAt: Date

    let title: String
    let body: String

    let imageURL: String?
    let deepLink: String?
    let externalURL: String?

    var isRead: Bool
}
