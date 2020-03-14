---
title: How to renew AND test an Apple push notification certificate
date: '2020-03-14T14:45:00.284Z'
description: Replacing (and testing) an APNS cert can be confusing. Here's an easy step-by-step guide
---

![https://docs-assets.developer.apple.com/published/175f241066/58245c65-723d-4785-84e1-11d7534c6e11.png](https://docs-assets.developer.apple.com/published/175f241066/58245c65-723d-4785-84e1-11d7534c6e11.png)

### Abstract

At my work, I am re-building (and expanding on) one our apps in React Native and TypeScript. I am also maintaining the existing iOS (built in Swift) and Android (built in Java) apps before they can be retired. It's been interesting dabbling in "native" code, and certainly makes me a better React Native developer. I would like to learn [Kotlin](https://hackr.io/blog/kotlin-vs-java) one day!

Recently, I had to update the iOS app's push notification certificate. Apple's *Push Notification Service* (APNS) requires every app to have a unique certificate, which expire one year after creation so must be renewed annually.

I found the process quite confusing, particularly testing the generated *.p12* cert to make sure I could actually send push notifications, so I thought I'd write a quick step-by-step to hopefully make your life easier if you ever need to do the same!

**Note:** *in order to receive an iOS push notification, you must use a physical iOS device. The iOS simulator will not work.*

### How to generate an APNS certificate

1. Create a [certificate signing request](https://help.apple.com/developer-account/#/devbfa00fef7) and save it to your Mac
2. Go to https://developer.apple.com/account/resources/certificates/list and follow the steps to create an "*Apple Push Notification service*" certificate. When it asks you to "*Upload a Certificate Signing Request*", use the one you just created. **Note:** you must [have the correct privileges](https://developer.apple.com/support/roles/) to do this.
3. Download the created certificate (look for the type *"Apple Push* *Services*") to your computer and double click it to add it to your Mac's keychain.
4. Right click on the certificate and export it from your keychain as a **.p12**. Don't add a password.
5. Apple expects the certificate to be in **.pem** format. You can convert the .p12 using the following terminal command: `openssl pkcs12 -in file.p12 -out file.pem -nodes -clcerts`  Don't set a password here.
6. Retrieve your iOS device's *device token*. This token should look something like `7cecd9bg882537e23fe81cd7aa5f912c4b609b446660bca99f14544ade12b5dc `. Where you get this from will differ per your implementation: 
   - [Here's a guide](https://invertase.io/oss/react-native-firebase/v6/messaging/reference/module#gatsby-focus-wrapper) if you're using the excellent React Native Firebase library.  
   - You will likely be storing it your database for use when sending push notifications to all your different users. You could look for it there.
   - If you have native Swift iOS app as I had, the easiest way for me was to simply put a breakpoint in Xcode in the `didRegisterForRemoteNotificationsWithDeviceToken()` method. This method should be called on sign-in, and I was able to retrieve my device's token there.
   - ...many other ways!

### How to test your new certificate

For this, we're going to simply do a *curl* on the terminal. Use the command:

```bash
curl -v https://api.push.apple.com/3/device/YOURDEVICETOKENID -d '{"aps":{"alert":"testing 123","sound":"default"}}' -H "apns-topic:YOURAPPNAME" -H "apns-expiration: 1" -H "apns-priority: 10" --http2 --cert RELATIVE-PATH-TO-YOUR-NEW-PEM-FILE
```

**Note:** *you may need to use the development server endpoint at `api.sandbox.push.apple.com`* 

This command is essentially what is happening when we send a push notification to Apple in order for them to forward it on to a device. If you receive a 200 OK response and your device gets a "testing 123" push notification, then your new certificate is working correctly! 

Swap out your old *.pem* for your new one server-side, and you should be good to go!