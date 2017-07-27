#import <Foundation/Foundation.h>
#import <GigyaSDK/Gigya.h>
#import <Cordova/CDV.h>
#import "AppDelegate.h"

@interface GigyaConnectPlugin : CDVPlugin <GSAccountsDelegate, GSPluginViewDelegate>

- (void)init:(CDVInvokedUrlCommand *)command;

- (void)registerToGlobalEvents:(CDVInvokedUrlCommand *)command;

- (void)sendRequest:(CDVInvokedUrlCommand *)command;

- (void)loginToProvider:(CDVInvokedUrlCommand *)command;

- (void)addConnectionToProvider:(CDVInvokedUrlCommand *)command;

- (void)logout:(CDVInvokedUrlCommand *)command;

- (void)showPlugin:(CDVInvokedUrlCommand *)command;

- (void)debugOptionEnableTestNetworks:(CDVInvokedUrlCommand *)command;

@end