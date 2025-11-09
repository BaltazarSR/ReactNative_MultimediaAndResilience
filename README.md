# Multimedia Resilience

A React Native mobile application built with Expo that demonstrates resilient data synchronization, offline-first architecture, and multimedia playback capabilities with venue mapping.

## Overview

This project was developed as part of a course at TEC, focusing on building a robust mobile application that can handle offline scenarios, background synchronization, and error tracking. The app allows users to browse music venues on a map, play music, and manage venue data with automatic cloud synchronization.

## Key Learning Outcomes

### Architecture & Design Patterns

- **MVC Architecture**: Implemented a clean Model-View-Controller pattern for better code organization and maintainability
  - **Models**: Type-safe data structures for venues, songs, markers, and screen props
  - **Views**: Reusable screen components and UI elements
  - **Controllers**: Business logic handlers for music playback, database operations, map interactions, and venue management

- **Service Layer Pattern**: Separation of concerns with dedicated services:
  - Database Service (SQLite operations)
  - API Service (mock API for data synchronization)
  - Background Sync Service (automated data sync)

### Resilience & Offline-First Architecture

- **Local-First Data Storage**: SQLite database for persistent offline storage
- **Background Synchronization**: Automatic data sync using Expo Background Fetch
  - Runs every 15+ minutes even when app is closed
  - Queues unsynchronized data for later upload
  - Push notifications on sync success/failure
  
- **Resilient Data Handling**:
  - Offline data persistence with sync status tracking
  - Automatic retry mechanisms for failed syncs
  - Graceful degradation when network is unavailable

### Error Monitoring & Production Readiness

- **Sentry Integration**: Real-time error tracking and performance monitoring
  - Automatic crash reporting
  - Session tracking
  - Environment-specific configuration (development/production)
  - Custom error boundaries

### Mobile-Specific Features

- **Background Tasks**: Using Expo Task Manager for background operations
- **Local Notifications**: Real-time sync status updates
- **Audio Playback**: Expo AV for multimedia handling
- **Native Maps**: React Native Maps for venue visualization
- **Cross-Platform**: Support for both iOS and Android

### Modern React Native Development

- **TypeScript**: Full type safety across the entire codebase
- **React Navigation**: Type-safe navigation with native stack navigator
- **React Hooks**: Functional components with custom hooks
- **Expo SDK 54**: Latest Expo features and optimizations
- **React Native 0.81**: New architecture support enabled

## Features

### Core Functionality

1. **Interactive Map**
   - Display music venues as markers
   - Add new venues with location picker
   - Real-time marker updates

2. **Music Player**
   - Play audio tracks
   - Playback controls (play, pause, seek)
   - Track information display

3. **Venue Management**
   - Create and store venue information
   - SQLite database for local storage
   - Sync status indicators

4. **Background Synchronization**
   - Automatic data sync every 15+ minutes
   - Background fetch when app is closed
   - Notification on sync completion
   - Manual sync option available

5. **Database Viewer**
   - View all stored venues
   - Monitor sync status
   - Delete venues

## Tech Stack

### Frontend
- **React Native** 0.81.5 - Mobile framework
- **TypeScript** 5.9.2 - Type safety
- **Expo** 54.0.22 - Development platform

### Navigation & UI
- **React Navigation** 7.x - Navigation system
- **@gorhom/bottom-sheet** - Bottom sheet modals
- **React Native Gesture Handler** - Touch gestures
- **React Native Reanimated** - Smooth animations
- **React Native SVG** - Vector graphics

### Data & Storage
- **Expo SQLite** - Local database
- **Axios** - HTTP client

### Maps & Location
- **React Native Maps** - Native maps integration

### Audio
- **Expo AV** - Audio/video playback

### Background Processing
- **Expo Background Fetch** - Background data sync
- **Expo Task Manager** - Background task scheduling
- **Expo Notifications** - Push notifications

### Monitoring & Analytics
- **Sentry** - Error tracking and monitoring

### Development Tools
- **Expo Font** - Custom font loading
- **Expo Splash Screen** - Splash screen management
- **Expo Constants** - App constants and configuration

## Project Structure

```
multimedia-resilience/
├── src/
│   ├── controllers/          # Business logic (MVC Controllers)
│   │   ├── AddVenueController.tsx
│   │   ├── DatabaseController.tsx
│   │   ├── MapController.tsx
│   │   ├── MusicListController.tsx
│   │   └── MusicPlayerController.tsx
│   ├── models/               # Data models (MVC Models)
│   │   ├── AddVenueScreenPropsModel.tsx
│   │   ├── DBVenueDataModel.tsx
│   │   ├── IconPropsModel.tsx
│   │   ├── MarkerDataModel.tsx
│   │   ├── RootParamsListModel.tsx
│   │   ├── SongModel.tsx
│   │   └── VenueDataModel.tsx
│   ├── views/                # UI components (MVC Views)
│   │   ├── screens/
│   │   │   ├── AddVenueScreen.tsx
│   │   │   ├── DatabaseScreen.tsx
│   │   │   ├── MapScreen.tsx
│   │   │   ├── MusicListScreen.tsx
│   │   │   └── MusicPlayerScreen.tsx
│   │   └── components/
│   ├── services/             # Service layer
│   │   ├── api/
│   │   │   └── mockAPIService.tsx
│   │   ├── background/
│   │   │   └── SyncService.tsx
│   │   └── database/
│   │       └── DatabaseService.tsx
│   ├── navigation/
│   │   └── AppNavigator.tsx
│   └── utils/
│       └── logger.ts
├── assets/                   # Static assets
│   ├── fonts/
│   ├── images/
│   └── songs/
├── android/                  # Android native code
├── ios/                      # iOS native code
├── App.tsx                   # Root component
├── index.ts                  # Entry point
├── app.json                  # Expo configuration
├── package.json
└── tsconfig.json
```

## Installation & Setup

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn
- Expo CLI
- iOS Simulator (for iOS development) or Android Emulator

### Steps

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd multimedia-resilience
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   
   Create a `.env` file in the root directory:
   ```env
   EXPO_PUBLIC_SENTRY_DSN=your_sentry_dsn_here
   ```

4. **Run the app**
   
   For iOS:
   ```bash
   npm run ios
   ```
   
   For Android:
   ```bash
   npm run android
   ```
   
   For development mode:
   ```bash
   npm start
   ```

## Running on Physical Devices

### iOS (TestFlight or Ad-Hoc)
- Requires Apple Developer account
- Build with EAS Build: `eas build --platform ios`

### Android (APK)
- Build with EAS Build: `eas build --platform android`

## What I Learned

### Technical Skills

1. **Mobile-First Development**
   - Understanding the unique challenges of mobile development
   - Handling offline scenarios gracefully
   - Managing device resources efficiently

2. **Background Processing**
   - Implementing background tasks that run when app is closed
   - Understanding OS limitations and best practices
   - Battery optimization considerations

3. **Data Synchronization**
   - Building conflict-free sync strategies
   - Queue management for offline operations
   - Optimistic UI updates

4. **Error Monitoring**
   - Setting up production-grade error tracking
   - Understanding crash reports and stack traces
   - Proactive debugging with Sentry

5. **SQLite & Mobile Databases**
   - Schema design for mobile applications
   - Query optimization
   - Migration strategies

6. **TypeScript in React Native**
   - Type-safe props and state management
   - Creating reusable type definitions
   - Improving code maintainability

### Soft Skills

- **Code Organization**: Structuring a scalable mobile application
- **Security Best Practices**: Handling sensitive data and API keys
- **Testing Strategies**: Manual testing on multiple devices
- **Documentation**: Writing clear README and code comments

## Security Considerations

- Environment variables for sensitive data (Sentry DSN)
- Secure storage practices with SQLite
- Background task permissions properly configured
- App permissions managed through app.json

## Debugging & Monitoring

The app includes comprehensive logging throughout:
- Custom logger utility for consistent log formatting
- Sentry integration for production error tracking
- Development vs production environment separation

To view logs:
```bash
# For iOS
npm run ios -- --verbose

# For Android
npm run android -- --verbose
```

### Screenshots

<img width="539" height="1016" alt="Screenshot 2025-11-09 at 2 57 05 p m" src="https://github.com/user-attachments/assets/fd8ffedd-7186-48c3-ac0d-235e66851f96" />
<img width="539" height="1016" alt="Screenshot 2025-11-09 at 2 57 16 p m" src="https://github.com/user-attachments/assets/ff4c30ce-a211-40d9-a430-510e64129810" />
<img width="539" height="1016" alt="Screenshot 2025-11-09 at 2 57 54 p m" src="https://github.com/user-attachments/assets/111ecac9-1d8a-4728-b729-c807aa8acc27" />
<img width="539" height="1016" alt="Screenshot 2025-11-09 at 2 58 31 p m" src="https://github.com/user-attachments/assets/70d5db57-a947-44e3-b6a3-20051a728294" />
<img width="539" height="1016" alt="Screenshot 2025-11-09 at 2 58 37 p m" src="https://github.com/user-attachments/assets/40483640-0d06-4a52-a365-816d5853b1b0" />
<img width="539" height="1016" alt="Screenshot 2025-11-09 at 2 58 42 p m" src="https://github.com/user-attachments/assets/b421b2af-ae83-4fd2-8e9f-39e6e2d08011" />
