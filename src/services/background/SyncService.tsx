import * as TaskManager from 'expo-task-manager';
import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';
import DatabaseService from '../database/DatabaseService';
import { simulateAPI } from '../api/mockAPIService';

const BACKGROUND_SYNC_TASK = 'background-sync-task';

TaskManager.defineTask(BACKGROUND_SYNC_TASK, async () => {
    try {
        console.log('Background sync started');
        
        const unsyncedCount = await DatabaseService.getUnsyncedCount();
        
        if (unsyncedCount > 0) {
            await simulateAPI()
            await DatabaseService.markAllAsSynced();
            await Notifications.scheduleNotificationAsync({
                content: {
                    title: 'Sync Successful',
                    body: `${unsyncedCount} venues synced in background`,
                    sound: true,
                },
                trigger: null,
            });
            return { success: true };
        }
        return { success: true };

    } catch (error) {
        console.error('Background sync failed:', error);
        await Notifications.scheduleNotificationAsync({
            content: {
                title: 'Sync Failed',
                body: 'Trying again',
                sound: true,
            },
            trigger: null,
        });
        return { success: false };
    }
});

class SyncService {
    private foregroundSyncInterval: NodeJS.Timeout | null = null;

    async performSync(showNotifications: boolean = false): Promise<boolean> {
        try {
            const unsyncedCount = await DatabaseService.getUnsyncedCount();
            
            if (unsyncedCount > 0) {
                console.log(`Auto-syncing ${unsyncedCount} venues...`);
                await simulateAPI();
                await DatabaseService.markAllAsSynced();
                
                if (showNotifications) {
                    await Notifications.scheduleNotificationAsync({
                        content: {
                            title: 'Sync Successful',
                            body: `${unsyncedCount} venues synced`,
                            sound: true,
                        },
                        trigger: null,
                    });
                }
                
                return true;
            }
            
            console.log('No venues to sync');
            return true;
        } catch (error) {
            console.error('Auto-sync error:', error);
            
            if (showNotifications) {
                await Notifications.scheduleNotificationAsync({
                    content: {
                        title: 'Sync Failed',
                        body: 'Will retry automatically in 5 minutes',
                        sound: true,
                    },
                    trigger: null,
                });
            }
            
            return false;
        }
    }

    async startForegroundSync() {
        this.stopForegroundSync();
        
        // Sync every 5 minutes in foreground
        this.foregroundSyncInterval = setInterval(() => {
            this.performSync(true);
        }, 5 * 60 * 1000);
        
        console.log('Foreground sync started (5 min intervals)');
        
        // Run immediately on start
        await this.performSync(true);
    }

    stopForegroundSync() {
        if (this.foregroundSyncInterval) {
            clearInterval(this.foregroundSyncInterval);
            this.foregroundSyncInterval = null;
            console.log('Foreground sync stopped');
        }
    }

    async registerBackgroundSync() {
        try {
            if (Platform.OS === 'android') {
                console.log('Background tasks on Android require additional setup');
                console.log('Using foreground sync instead');
            } else if (Platform.OS === 'ios') {
                console.log('iOS background tasks require additional native configuration');
                console.log('Using foreground sync instead');
            }
            
            console.log('Background sync registration attempted');
        } catch (error) {
            console.error('Error registering background sync:', error);
        }
    }

    async unregisterBackgroundSync() {
        try {
            await TaskManager.unregisterTaskAsync(BACKGROUND_SYNC_TASK);
            console.log('Background sync unregistered');
        } catch (error) {
            console.error('Error unregistering background sync:', error);
        }
    }

    async isRegistered(): Promise<boolean> {
        try {
            return await TaskManager.isTaskRegisteredAsync(BACKGROUND_SYNC_TASK);
        } catch (error) {
            console.error('Error checking registration:', error);
            return false;
        }
    }
  
}

export default new SyncService();