# Transaction History App

A secure mobile banking application built with Expo and React Native, featuring transaction history management and biometric authentication.

## Prerequisites

- [Node.js](https://nodejs.org/)
- [npm](https://www.npmjs.com/)
- [Expo CLI](https://docs.expo.dev/workflow/expo-cli/)

## Installation

1. Install dependencies:
   ```bash
   npm install
   ```

## Running the App

This app can be run with Expo Go or with a development build. EAS is used for building the app in cloud. You may use Expo Go to launch the app on your device, emulator, or simulator. Alternatively, you can check the instructions for development builds to run the app for iOS or Android.

### Option 1: Expo Go

Quickest and easiest way to test the app:

1. Install Expo Go on your device/emulator/simulator
2. Start the development server:
   ```bash
   npx expo start
   ```
3. Make sure you are in Expo Go mode (you can switch by pressing 's' in the terminal)
4. Scan the QR code with or use the command suggested by expo to open from emulator/simulator:

### Option 2: iOS Simulator (for development build)

Requires macOS with Xcode installed:

1. Install Xcode from the Mac App Store
2. Install iOS Simulator through Xcode
3. Download the build file from [EAS Build](https://expo.dev/artifacts/eas/vNJAMAZefoFDbayeDNc3Yt.tar.gz)
4. Unzip the build file and drag it into the simulator to run the app on the simulator
5. Start the development server (make sure you are in the development build):
   ```bash
   npx expo start
   ```

### Option 3: Android Emulator/Device  (for development build)

Requires Android Studio and Android SDK:

1. Set up Android Studio and create an emulator
2. Download and install the .apk build file from [EAS Build](https://expo.dev/accounts/hingfei99/projects/transaction-history-app/builds/1ad9aebc-d6fd-4e08-b8bb-32e20422af21)
3. Launch the app and start the development server (make sure you are in the development build):
   ```bash
   npx expo start
   ```
   
For physical Android device:
1. Enable Developer Options and USB Debugging on your device
2. Connect device via USB
3. Run the development build command above
4. Launch the app and start the development server (make sure you are in the development build):
   ```bash
   npx expo start
   ```

## Features

- Biometric authentication
- Transaction history
- Transaction details
- Amount visibility toggle
- Transaction filtering

## Tech Stack

- Expo
- React Native
- NativeWind (TailwindCSS)
- TypeScript
