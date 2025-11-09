import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Platform, AppState } from 'react-native';
import AppNavigator from './src/navigation/AppNavigator';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import DatabaseService from './src/services/database/DatabaseService';
import * as Notifications from 'expo-notifications';
import SyncService from './src/services/background/SyncService';
import { logger } from './src/utils/logger';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldPlaySound: true,
    shouldSetBadge: false,
    shouldShowBanner: true,
    shouldShowList: true,
  }),
});

SplashScreen.preventAutoHideAsync();

export default function App() {

  const [loaded, error] = useFonts({
    'StackSans-ExtraLight': require('./assets/fonts/StackSansText-ExtraLight.ttf'),
    'StackSans-Light': require('./assets/fonts/StackSansText-Light.ttf'),
    'StackSans-Regular': require('./assets/fonts/StackSansText-Regular.ttf'),
    'StackSans-Medium': require('./assets/fonts/StackSansText-Medium.ttf'),
    'StackSans-SemiBold': require('./assets/fonts/StackSansText-SemiBold.ttf'),
    'StackSans-Bold': require('./assets/fonts/StackSansText-Bold.ttf'),
  });

  useEffect(() => {
    initializeApp();
  }, []);

  const initializeApp = async () => {
    try {

      // Init database
      await DatabaseService.initDatabase();
      logger.log('[App] Database ready');
      
      // Request notification permissions
      if (Platform.OS === 'android') {
        await Notifications.setNotificationChannelAsync('default', {
          name: 'Default',
          importance: Notifications.AndroidImportance.MAX,
          vibrationPattern: [0, 250, 250, 250],
          lightColor: '#FF231F7C',
        });
      }
      const { status } = await Notifications.requestPermissionsAsync();
      if (status !== 'granted') {
        logger.log('[App] Notification permissions not granted');
      }

      // Register background fetch for automatic syncing
      await SyncService.registerBackgroundFetch();
      
      // Check background fetch status
      const bgStatus = await SyncService.getBackgroundFetchStatus();

      logger.log('[App] App initialized');
    } catch (error) {
      logger.error('[App] Error initializing app:', error);//
    }
  };

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  // useEffect(() => {
  //   const subscription = AppState.addEventListener('change', async (nextAppState) => {
  //     if (nextAppState === 'active') {
  //       await SyncService.performSync(true);
  //     }
  //   });

  //   return () => {
  //     subscription.remove();
  //   };
  // }, []);

  if (!loaded && !error) {
    return null;
  }

  return (
    <>
      <AppNavigator />
      <StatusBar />
    </>
  );
}

const styles = StyleSheet.create({

});





// 5 minute video showing functionality and explaining code



// Resilience
// Show unsynced transactions
// Notifications when sync was succesfull
// Save transaction in SQLite
// Mock API with errors