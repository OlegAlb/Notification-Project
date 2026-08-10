import Foundation

final class MockNotificationSource {

    static let shared = MockNotificationSource()

    private init() {}

    func generateDemoNotifications() {

        let payloads: [[AnyHashable: Any]] = [

            [
                "aps": [
                    "alert": [
                        "title": "Exclusive New Arrivals",
                        "body": "Check out largest collection before it's gone. Shop now"
                    ],
                    "sound": "default",
                    "mutable-content": 1
                ],

                "custom": [
                    "i": "5184f8d0-b842-44a9-b266-cdc0dfe7dd04",
                    "a": [
                        "actionType": "url",
                        "actionValue":
                            "https://unsplash.com/photos/woman-in-yellow-tracksuit-standing-on-basketball-court-side-nimElTcTNyY"
                    ]
                ],

                "os_data": [
                    "i": "5184f8d0-b842-44a9-b266-cdc0dfe7dd04",
                    "buttons": [],
                    "att": [
                        "id":
                            "https://img.os-content.com/tmp/4469f16c-5588-4e17-9aab-96221df449de/H8Y0LVL1TXer7xo5wK0f_dom-hill-nimElTcTNyY-unsplash.jpg"
                    ]
                ]
            ],

            [
                "aps": [
                    "alert": [
                        "title": "Your Wishlist Item Is Back",
                        "body": "Good news! The item you loved is back in stock. Act fast!"
                    ],
                    "sound": "default",
                    "mutable-content": 1
                ],

                "custom": [
                    "i": "cc09c686-1b31-45df-80f0-337815fea5b8",
                    "a": [
                        "actionType": "deeplink",
                        "actionValue":
                            "notificationproject://promo/123"
                    ]
                ],

                "os_data": [
                    "i": "cc09c686-1b31-45df-80f0-337815fea5b8",
                    "buttons": [],
                    "att": [
                        "id":
                            "https://img.os-content.com/tmp/cbffe2f5-47cc-44a3-8dba-f8887076510d/RFtCc2miTtext8JSiFsO_raquel-gambin-kS3YkVtf85U-unsplash.jpg"
                    ]
                ]
            ],

            [
                "aps": [
                    "alert": [
                        "title": "System Check: Your Turn! 🚀",
                        "body":
                            "We are testing our latest updates to ensure the best experience for you. Tap to see if everything is running smoothly!"
                    ],
                    "sound": "default",
                    "mutable-content": 1
                ],

                "custom": [
                    "i": "19dd5828-7e0d-48e3-9f08-d0911d5c9aff",
                    "a": [:]
                ],

                "os_data": [
                    "i": "19dd5828-7e0d-48e3-9f08-d0911d5c9aff",
                    "buttons": []
                ]
            ]
        ]

        for payload in payloads {

            guard let notification =
                    NotificationParser.shared.parse(
                        userInfo: payload
                    )
            else {
                print(
                    "[Mock] Failed to parse payload"
                )

                continue
            }

            NotificationStore.shared.save(
                notification
            )
        }

        print(
            "[Mock] Generated \(payloads.count) notifications"
        )
    }
}