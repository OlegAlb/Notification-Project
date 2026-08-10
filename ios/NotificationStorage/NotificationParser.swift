import Foundation

final class NotificationParser {

    static let shared = NotificationParser()

    private init() {}

    func parse(userInfo: [AnyHashable: Any]) -> NotificationRecord? {
        let aps = dictionary(
            userInfo["aps"]
        )

        let alert = dictionary(
            aps?["alert"]
        )

        let title = string(alert?["title"]) ?? ""
        let body = string(alert?["body"]) ?? ""

        guard !title.isEmpty || !body.isEmpty else {
            print("[NotificationParser] Push does not contain alert")
            return nil
        }

        let custom = parseDictionary(
            userInfo["custom"]
        )

        let osData = dictionary(
            userInfo["os_data"]
        )

        let notificationId =
            string(custom?["i"])
            ?? string(osData?["i"])
            ?? UUID().uuidString

        let action = dictionary(
            custom?["a"]
        )

        let actionType = string(
            action?["actionType"]
        )

        let actionValue = string(
            action?["actionValue"]
        )

        var deepLink: String?
        var externalURL: String?

        if let actionType,
           let actionValue,
           !actionValue.isEmpty {

            switch actionType.lowercased() {

            case "deeplink":
                deepLink = actionValue

            case "url":
                if isHTTPURL(actionValue) {
                    externalURL = actionValue
                }

            default:
                // Fallback на случай неизвестного типа action.
                if isHTTPURL(actionValue) {
                    externalURL = actionValue
                } else {
                    deepLink = actionValue
                }
            }
        }

        let attachment = dictionary(
            osData?["att"]
        )

        let imageURL = string(
            attachment?["id"]
        )

        return NotificationRecord(
            id: notificationId,
            receivedAt: Date(),
            title: title,
            body: body,
            imageURL: imageURL,
            deepLink: deepLink,
            externalURL: externalURL,
            isRead: false
        )
    }

    private func isHTTPURL(_ value: String) -> Bool {
        guard let url = URL(string: value) else {
            return false
        }

        return url.scheme?.lowercased() == "http"
            || url.scheme?.lowercased() == "https"
    }

    private func string(_ value: Any?) -> String? {
        value as? String
    }

    private func dictionary(_ value: Any?) -> [AnyHashable: Any]? {
        value as? [AnyHashable: Any]
    }

    private func parseDictionary(_ value: Any?) -> [AnyHashable: Any]? {
        if let dictionary = value as? [AnyHashable: Any] {
            return dictionary
        }

        if let dictionary = value as? [String: Any] {
            return dictionary
        }

        if let jsonString = value as? String,
           let data = jsonString.data(using: .utf8),
           let object = try? JSONSerialization.jsonObject(
                with: data
           ),
           let dictionary = object as? [String: Any] {
            return dictionary
        }

        return nil
    }
}