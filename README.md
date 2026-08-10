# Notification History

Тестовое приложение на React Native для хранения и отображения истории push-уведомлений.

Приложение получает уведомления через OneSignal, сохраняет их локально и предоставляет React Native-интерфейс для просмотра истории, отметки уведомлений прочитанными и перехода по действиям из уведомления.

## Реализованный функционал

### Работа с уведомлениями

Реализованы:

- получение push-уведомления;
- сохранение уведомления в локальное хранилище;
- получение всей истории;
- отметка отдельного уведомления как прочитанного;
- отметка всех уведомлений как прочитанных;
- обновление React Native UI после получения нового уведомления;
- обработка переходов по deep link;
- открытие внешних URL через WebView.

### Native Module

Доступ к нативной истории из React Native реализован через TurboModule:

```text
NativeNotificationHistory
├── getNotifications()
├── markAsRead(id)
└── markAllAsRead()
```

Контракт модуля описан через TypeScript Codegen.

Для Android и iOS используются нативные реализации соответствующего модуля.

---

# Архитектура

Проект разделен на несколько основных уровней.

```text
src/
├── app/
│   ├── navigation/
│   ├── App.tsx
│   └── container.ts
│
├── domain/
│   └── entities/
│       └── PushNotification.ts
│
├── infrastructure/
│   └── native/
│       ├── NativeNotificationHistory.ts
│       ├── NotificationNativeMapper.ts
│       └── NotificationNativeStorage.ts
│
├── presentation/
│   ├── components/
│   ├── hooks/
│   ├── providers/
│   └── screens/
│
└── shared/
    └── utils/
```

### Domain

Содержит модель уведомления, используемую React Native частью приложения.

`PushNotification` не зависит от конкретной реализации хранения или OneSignal.

### Infrastructure

Отвечает за взаимодействие с нативным кодом.

`NativeNotificationHistory` — Codegen-контракт TurboModule.

`NotificationNativeStorage` — небольшая абстракция над нативным хранилищем.

Таким образом, UI не обращается напрямую к `TurboModuleRegistry`.

### Presentation

Содержит:

- `NotificationProvider`;
- `useNotifications`;
- экран истории;
- карточку уведомления;
- навигацию;
- WebView;
- экран Promo.

Provider подписывается на native event `onNotificationReceived` и обновляет историю без необходимости вручную перезагружать экран.

---

# Android

Android является основной полностью проверенной реализацией.

Используется нативное хранилище истории уведомлений.

Основные части:

```text
android/app/src/main/java/com/notificationproject/
└── notifications/
    ├── model/
    │   └── NotificationRecord.kt
    ├── mapper/
    │   └── NotificationMapper.kt
    ├── storage/
    │   └── NotificationHistoryStore.kt
    ├── recorder/
    │   └── NotificationHistoryRecorder.kt
    ├── initialization/
    │   └── OneSignalInitializer.kt
    └── turbo/
        ├── NativeNotificationHistoryModule.kt
        └── NativeNotificationHistoryPackage.kt
```

Для OneSignal используется собственный mapper, который преобразует native notification в внутреннюю модель:

```text
OneSignal notification
        ↓
NotificationMapper
        ↓
NotificationRecord
        ↓
NotificationHistoryStore
```

### Native events

TurboModule предоставляет события:

```text
onNotificationReceived
onNotificationClicked
```

При получении уведомления native-часть:

1. получает уведомление от OneSignal;
2. преобразует его в `NotificationRecord`;
3. сохраняет в локальное хранилище;
4. уведомляет React Native через `onNotificationReceived`.

React Native Provider получает событие и вызывает `refresh()`.

---

# iOS

iOS-часть реализована с использованием тех же основных принципов:

- `NotificationRecord`;
- `NotificationParser`;
- `NotificationStore`;
- `NotificationHistoryRecorder`;
- `NativeNotificationHistory`;
- React Native Codegen;
- App Group для хранения данных.

Хранилище использует:

```text
UserDefaults(suiteName: ...)
```

что позволяет использовать App Group между основным приложением и Notification Service Extension.

Для обработки payload используется отдельный `NotificationParser`, поскольку структура payload OneSignal на iOS отличается от Android.

## Ограничение проверки iOS

На момент выполнения задания моя подписка на Apple Developer Program истекла, поэтому я не смог полноценно проверить получение реальных APNs push-уведомлений на физическом iOS-устройстве.

По этой причине для проверки iOS истории используется mock source:

```text
MockNotificationSource
```

Он создает тестовые payloads, максимально приближенные к структуре OneSignal и передает их через тот же parser и storage pipeline.

Это позволяет проверить:

- parsing payload;
- создание `NotificationRecord`;
- сохранение;
- чтение истории;
- `markAsRead`;
- `markAllAsRead`;
- работу React Native TurboModule с историей.

Полноценное end-to-end тестирование APNs/OneSignal на iOS требует действующей Apple Developer Program и устройства/подписанных provisioning profiles.

# Запуск

## Требования

### Общие

- Node.js
- npm
- JDK
- Android Studio / Android SDK
- Xcode — для iOS
- CocoaPods — для iOS

### Android

Для запуска:

```bash
npm install

npm run android
```

### iOS

```bash
npm install

cd ios
pod install
cd ..

npm run ios
```

# OneSignal

Для проекта используется OneSignal.

В репозитории присутствуют необходимые для тестового приложения конфигурационные данные OneSignal.

Они используются исключительно для демонстрации работы тестового приложения и не должны рассматриваться как production secrets.

Для production-приложения конфигурацию следует вынести в соответствующий environment/configuration management.

# Примечание

Android-реализация является проверенной реализацией проекта.

iOS-часть сохранена в проекте для демонстрации реализации того же native API и архитектурного подхода на второй платформе. Ограничение с реальным APNs-тестированием связано исключительно с отсутствием действующей Apple Developer Program на момент выполнения задания.
