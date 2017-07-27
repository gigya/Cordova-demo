#import "AppDelegate.h"
#import <objc/runtime.h>
#import "GigyaConnectPlugin.h"

@interface GigyaConnectPlugin ()

@property (strong, nonatomic) NSString *globalEventsCallbackId;
@property (strong, nonatomic) NSString *pluginEventsCallbackId;

@end

@implementation GigyaConnectPlugin

#pragma mark - Cordova commands

- (void)init:(CDVInvokedUrlCommand *)command
{
    NSString *apiKey = [[command arguments] objectAtIndex:0];
    NSString *apiDomain = [[command arguments] objectAtIndex:1];

    [Gigya initWithAPIKey:apiKey application:[UIApplication sharedApplication] launchOptions:nil APIDomain:apiDomain];
}

- (void)registerToGlobalEvents:(CDVInvokedUrlCommand *)command
{
    self.globalEventsCallbackId = command.callbackId;
    [Gigya setAccountsDelegate:self];
}

- (void)sendRequest:(CDVInvokedUrlCommand *)command
{
    NSString *method = [[command arguments] objectAtIndex:0];

    NSError *error;
    NSDictionary *params = [self dictionaryFromJSONString:[[command arguments] objectAtIndex:1] error:&error];

    if (error) {
        CDVPluginResult *pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_ERROR messageAsString:[self JSONStringFromError:error]];
        [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
        return;
    }

    BOOL useHTTPS = [[[command arguments] objectAtIndex:2] boolValue];

    GSRequest *request = [GSRequest requestForMethod:method parameters:params];
    request.useHTTPS = useHTTPS;

    [request sendWithResponseHandler:^(GSResponse *response, NSError *error) {
        CDVPluginResult *pluginResult;

        if (response.errorCode == 0)
            pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsString:[response JSONString]];
        else
            pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_ERROR messageAsString:[response JSONString]];

        [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
    }];
}

- (void)loginToProvider:(CDVInvokedUrlCommand *)command
{
    NSString *provider = [[command arguments] objectAtIndex:0];

    NSError *error;
    NSDictionary *params = [self dictionaryFromJSONString:[[command arguments] objectAtIndex:1] error:&error];

    if (error) {
        CDVPluginResult *pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_ERROR messageAsString:[self JSONStringFromError:error]];
        [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
        return;
    }

    [Gigya loginToProvider:provider parameters:params over:self.viewController completionHandler:^(GSUser *user, NSError *error) {
        CDVPluginResult *pluginResult;

        if (error) {
            pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_ERROR messageAsString:[self JSONStringFromError:error]];
        } else {
            pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsString:[user JSONString]];
        }

        [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
    }];
}

- (void)addConnectionToProvider:(CDVInvokedUrlCommand *)command
{
    NSString *provider = [[command arguments] objectAtIndex:0];

    NSError *error;
    NSDictionary *params = [self dictionaryFromJSONString:[[command arguments] objectAtIndex:1] error:&error];

    if (error) {
        CDVPluginResult *pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_ERROR messageAsString:[self JSONStringFromError:error]];
        [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
        return;
    }

    [Gigya addConnectionToProvider:provider parameters:params over:self.viewController completionHandler:^(GSUser *user, NSError *error) {
        CDVPluginResult *pluginResult;

        if (error) {
            pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_ERROR messageAsString:[self JSONStringFromError:error]];
        } else {
            pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsString:[user JSONString]];
        }

        [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
    }];
}

- (void)logout:(CDVInvokedUrlCommand *)command
{
    [Gigya logout];
}

- (void)showPlugin:(CDVInvokedUrlCommand *)command
{
    NSString *pluginName = [[command arguments] objectAtIndex:0];

    NSError *error;
    NSDictionary *params = [self dictionaryFromJSONString:[[command arguments] objectAtIndex:1] error:&error];

    if (error) {
        CDVPluginResult *pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_ERROR messageAsString:[self JSONStringFromError:error]];
        [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
        return;
    }

    self.pluginEventsCallbackId = command.callbackId;

    [Gigya showPluginDialogOver:self.viewController plugin:pluginName parameters:params completionHandler:^(BOOL closedByUser, NSError *error) {
        if (!self.pluginEventsCallbackId)
            return;

        NSMutableDictionary *event;

        if (error && error.userInfo)
            event = [error.userInfo mutableCopy];
        else
            event = [[NSMutableDictionary alloc] init];

        event[@"eventName"] = @"dismiss";
        event[@"canceledByUser"] = @(closedByUser);

        CDVPluginResult *pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsString:[self JSONStringFromDictionary:@{ @"event": event }]];
        [pluginResult setKeepCallbackAsBool:NO];
        [self.commandDelegate sendPluginResult:pluginResult callbackId:self.pluginEventsCallbackId];

        self.pluginEventsCallbackId = nil;
    } delegate:self];
}

- (void)debugOptionEnableTestNetworks:(CDVInvokedUrlCommand *)command
{
    [Gigya __setDebugOptionEnableTestNetworks:YES];
}

#pragma mark - GSPluginViewDelegate

- (void)pluginView:(GSPluginView *)pluginView finishedLoadingPluginWithEvent:(NSDictionary *)event
{
    if (!self.pluginEventsCallbackId)
        return;

    CDVPluginResult *pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsString:[self JSONStringFromDictionary:@{ @"event": event }]];
    [pluginResult setKeepCallbackAsBool:YES];
    [self.commandDelegate sendPluginResult:pluginResult callbackId:self.pluginEventsCallbackId];
}

- (void)pluginView:(GSPluginView *)pluginView firedEvent:(NSDictionary *)event;
{
    if (!self.pluginEventsCallbackId)
        return;

    CDVPluginResult *pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsString:[self JSONStringFromDictionary:@{ @"event": event }]];
    [pluginResult setKeepCallbackAsBool:YES];
    [self.commandDelegate sendPluginResult:pluginResult callbackId:self.pluginEventsCallbackId];
}

- (void)pluginView:(GSPluginView *)pluginView didFailWithError:(NSError *)error;
{
    if (!self.pluginEventsCallbackId)
        return;

    NSMutableDictionary *event = [error.userInfo mutableCopy];
    event[@"errorCode"] = @(error.code);
    event[@"errorMessage"] = [error localizedDescription];
    if (event[@"NSLocalizedDescription"])
        [event removeObjectForKey:@"NSLocalizedDescription"];

    CDVPluginResult *pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsString:[self JSONStringFromDictionary:@{ @"event": event }]];
    [pluginResult setKeepCallbackAsBool:YES];
    [self.commandDelegate sendPluginResult:pluginResult callbackId:self.pluginEventsCallbackId];
}

#pragma mark - GSAccountsDelegate

- (void)accountDidLogin:(GSAccount *)account
{
    if (!self.globalEventsCallbackId)
        return;

    NSError *error;
    NSDictionary *accountData = [self dictionaryFromJSONString:[account JSONString] error:&error]; // converts GSAccount to NSDictionary through JSON string (due to GSAccount/GSResponse limitation)
    if (error)
        return;

    CDVPluginResult *pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsString:[self JSONStringFromDictionary:@{ @"type": @"login", @"account": accountData }]];
    [pluginResult setKeepCallbackAsBool:YES];
    [self.commandDelegate sendPluginResult:pluginResult callbackId:self.globalEventsCallbackId];
}

- (void)accountDidLogout
{
    if (!self.globalEventsCallbackId)
        return;

    CDVPluginResult *pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsString:[self JSONStringFromDictionary:@{ @"type": @"logout" }]];
    [pluginResult setKeepCallbackAsBool:YES];
    [self.commandDelegate sendPluginResult:pluginResult callbackId:self.globalEventsCallbackId];
}

#pragma mark - Utility methods

- (NSDictionary *)dictionaryFromJSONString:(NSString *)json error:(NSError **)error
{
    NSData *jsonData = [json dataUsingEncoding:NSUTF8StringEncoding];
    return [NSJSONSerialization JSONObjectWithData:jsonData
                                           options:NSJSONReadingMutableContainers
                                             error:error];
}

- (GSResponse *)getInvalidParameterFormatResponse:(NSError *)error
{
    return [GSResponse responseWithError:[NSError errorWithDomain:GSGigyaSDKDomain
                                                             code:400004
                                                         userInfo:@{NSLocalizedDescriptionKey : @"Invalid parameter format",
                                                                 NSUnderlyingErrorKey : error}]];
}

- (NSString *)JSONStringFromError:(NSError *)error {
    return [self JSONStringFromDictionary:[self DictionaryFromError:error]];
}


- (NSMutableDictionary *)DictionaryFromError:(NSError *)error
{
    NSMutableDictionary *dict = [NSMutableDictionary dictionary];
    dict[@"errorCode"] = @(error.code);
    dict[@"errorMessage"] = (error.userInfo)[NSLocalizedDescriptionKey];

    NSMutableDictionary *details = [error.userInfo mutableCopy];
    NSError *underlyingError = details[NSUnderlyingErrorKey];

    if (underlyingError)
        details[NSUnderlyingErrorKey] = [underlyingError description];

    dict[@"errorDetails"] = [details description];

    NSString *regToken = [error userInfo][@"regToken"];
    if (regToken)
        dict[@"regToken"] = regToken;

    return dict;
}

- (NSString *)JSONStringFromDictionary:(NSDictionary *)dict
{
    NSData *jsonData = [NSJSONSerialization dataWithJSONObject:dict
                                                       options:0
                                                         error:nil];

    NSString *result = [[NSString alloc] initWithData:jsonData encoding:NSUTF8StringEncoding];

    return result;
}

@end

#pragma mark - AppDelegate Overrides

static void swizzleMethod(Class class, SEL destinationSelector, SEL sourceSelector);

@implementation AppDelegate (GigyaConnectPlugin)

+ (void)load
{
  swizzleMethod([AppDelegate class],
                @selector(application:openURL:sourceApplication:annotation:),
                @selector(gigya_swizzled_application:openURL:sourceApplication:annotation:));
}

- (BOOL)gigya_swizzled_application:(UIApplication *)application
                     openURL:(NSURL *)url
           sourceApplication:(NSString *)sourceApplication
                  annotation:(id)annotation
{
    BOOL wasHandled = [Gigya handleOpenURL:url
                               application:application
                         sourceApplication:sourceApplication
                                annotation:annotation];

    if (wasHandled)
        return wasHandled;
    else
        return [self gigya_swizzled_application:application openURL:url sourceApplication:sourceApplication annotation:annotation]; // super
}

@end

#pragma mark - Swizzling

static void swizzleMethod(Class class, SEL destinationSelector, SEL sourceSelector) {
    Method destinationMethod = class_getInstanceMethod(class, destinationSelector);
    Method sourceMethod = class_getInstanceMethod(class, sourceSelector);

    // If the method doesn't exist, add it.  If it does exist, replace it with the given implementation.
    if (class_addMethod(class, destinationSelector, method_getImplementation(sourceMethod), method_getTypeEncoding(sourceMethod))) {
        class_replaceMethod(class, destinationSelector, method_getImplementation(destinationMethod), method_getTypeEncoding(destinationMethod));
    } else {
        method_exchangeImplementations(destinationMethod, sourceMethod);
    }
}