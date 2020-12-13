---
title: How to upgrade Android Gradle (for React Native devs)
date: '2020-12-13T14:45:00.284Z'
description: An easy, step-by-step guide for updating Gradle in your React Native projects
---

<img src="https://images.unsplash.com/photo-1546871241-c9203fd57143?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1650&q=80" alt="A boat on a misty Loch Lomand in Scotland" style="zoom:80%;" />

## What's Gradle?

Gradle is a build automation tool for Android applications. It handles things like app compilation, testing and deployment.

## Why do I need to upgrade it?

In general, you shouldn't need to upgrade it explicitly. Newer React Native versions tend to [also update the project's Gradle version](https://react-native-community.github.io/upgrade-helper/?from=0.62.2&to=0.63.0), so in most instances you don't have to worry about it.

Where you might have to upgrade Gradle versions explicitly is in cases where your Android build fails. For example, I had this wonderfully cryptic build error that was only solved by using a newer Gradle version:

```
> Could not resolve all dependencies for configuration ':debug'.
   > Problems reading data from Binary store in /tmp/gradle8793563212642185736.bin (exist: false)
```

## OK, so how do I upgrade Gradle?

1. Check your project's Gradle version in `android/gradle/wrapper/gradle-wrapper.properties`. Look for the `distributionUrl` key.
2. Go to [the Gradle distribution page](https://services.gradle.org/distributions/)
3. Copy the link address of the Gradle version you want update to. I'd suggest you don't go for the `rc` ones, and make sure you pick a \_\_-**all**.zip version.
4. Paste this copied address to replace the value for `distributionUrl`. **You will need to escape the colon**. For example: `distributionUrl=https\://services.gradle.org/distributions/gradle-6.2-all.zip` (notice the `\` before the `:` character)
5. Run `react-native run-android` or click "sync" in Android Studio, and your new Gradle version will be downloaded as part of that process!
