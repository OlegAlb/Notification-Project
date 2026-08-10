#import "NativeNotificationHistory.h"

#import <React-RCTAppDelegate/RCTAppDelegate.h>

#if __has_include("NotificationProject-Swift.h")
#import "NotificationProject-Swift.h"
#endif

@implementation NativeNotificationHistory

RCT_EXPORT_MODULE(NativeNotificationHistory)

- (std::shared_ptr<facebook::react::TurboModule>)getTurboModule:
    (const facebook::react::ObjCTurboModule::InitParams &)params
{
    return std::make_shared<
    facebook::react::NativeNotificationHistorySpecJSI
    >(params);
}

- (NSArray *)getNotifications
{
    NSString *json =
        [[NotificationStore shared] getAllJSON];

    NSData *data =
        [json dataUsingEncoding:NSUTF8StringEncoding];

    if (!data) {
        return @[];
    }

    NSError *error = nil;

    id result =
        [NSJSONSerialization
            JSONObjectWithData:data
            options:0
            error:&error];

    if (error) {
        NSLog(
            @"[NativeNotificationHistory] Failed to parse JSON: %@",
            error
        );

        return @[];
    }

    if (![result isKindOfClass:[NSArray class]]) {
        return @[];
    }

    return result;
}

- (void)markAsRead:(NSString *)notificationId
{
    [[NotificationStore shared]
        markAsRead:notificationId];
}

- (void)markAllAsRead
{
    [[NotificationStore shared]
        markAllAsRead];
}

@end
