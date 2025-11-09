import * as TaskManager from 'expo-task-manager';
import * as BackgroundFetch from 'expo-background-fetch';
import * as Notifications from 'expo-notifications';
import { simulateAPI } from '../api/mockAPIService';
import DatabaseService from '../database/DatabaseService';
import { logger } from '../../utils/logger';

const BACKGROUND_SYNC_TASK = 'background-sync-task';

// Define the background task
TaskManager.defineTask(BACKGROUND_SYNC_TASK, async () => {
    try {
        logger.log('[Sync Service] Background fetch sync started');
        
        const unsyncedCount = await DatabaseService.getUnsyncedCount();
        
        if (unsyncedCount > 0) {
            await simulateAPI();
            await DatabaseService.markAllAsSynced();
            
            await Notifications.scheduleNotificationAsync({
                content: {
                    title: 'Sync Successful',
                    body: `${unsyncedCount} venues synced in background`,
                    sound: true,
                },
                trigger: null,
            });
            
            logger.log(`[Sync Service] Successfully synced ${unsyncedCount} venues`);
            return BackgroundFetch.BackgroundFetchResult.NewData;
        }
        
        logger.log('[Sync Service] No venues to sync');
        return BackgroundFetch.BackgroundFetchResult.NoData;

    } catch (error) {
        logger.warn('[Sync Service] Background fetch sync failed:', error);
        
        await Notifications.scheduleNotificationAsync({
            content: {
                title: 'Sync Failed',
                body: 'Will retry automatically',
                sound: true,
            },
            trigger: null,
        });
        
        return BackgroundFetch.BackgroundFetchResult.Failed;
    }
});

class SyncService {
    async performSync(showNotifications: boolean = false): Promise<boolean> {
        try {
            const unsyncedCount = await DatabaseService.getUnsyncedCount();
            
            if (unsyncedCount > 0) {
                logger.log(`[Sync Service] Syncing ${unsyncedCount} venues...`);
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
            
            logger.log('[Sync Service] No venues to sync');
            return true;
        } catch (error) {
            logger.warn('[Sync Service] Sync error:', error);
            
            if (showNotifications) {
                await Notifications.scheduleNotificationAsync({
                    content: {
                        title: 'Sync Failed',
                        body: 'Will retry automatically',
                        sound: true,
                    },
                    trigger: null,
                });
            }
            
            return false;
        }
    }

    async registerBackgroundFetch() {
        try {
            // Check if already registered
            const isRegistered = await TaskManager.isTaskRegisteredAsync(BACKGROUND_SYNC_TASK);
            
            if (isRegistered) {
                logger.log('[Sync Service] Background fetch already registered');
                return;
            }

            // Register background fetch
            await BackgroundFetch.registerTaskAsync(BACKGROUND_SYNC_TASK, {
                minimumInterval: 15 * 60,
                stopOnTerminate: false,
                startOnBoot: true,
            });
            
            logger.log('[Sync Service] Background fetch registered successfully');
            logger.log('[Sync Service] Will sync every 15+ minutes');
        } catch (error) {
            logger.error('[Sync Service] Error registering background fetch:', error);
        }
    }

    async getBackgroundFetchStatus(): Promise<BackgroundFetch.BackgroundFetchStatus> {
        try {
            const status = await BackgroundFetch.getStatusAsync();
            logger.log('[Sync Service] Background fetch status:', status);
            return status ?? BackgroundFetch.BackgroundFetchStatus.Restricted;
        } catch (error) {
            logger.error('[Sync Service] Error getting background fetch status:', error);
            return BackgroundFetch.BackgroundFetchStatus.Restricted;
        }
    }
}

export default new SyncService();