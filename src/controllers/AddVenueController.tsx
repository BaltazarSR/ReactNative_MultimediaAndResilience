import DatabaseService from '../services/database/DatabaseService';
import * as Notifications from 'expo-notifications';
import { useState, useEffect } from 'react';
import { simulateAPI } from '../services/api/mockAPIService';
import { VenueData } from '../models/VenueDataModel';
import { logger } from '../utils/logger';

export const AddVenueController = () => {
    const [venueName, setVenueName] = useState('');
    const [totalVenues, setTotalVenues] = useState(0);
    const [unsyncedVenues, setUnsyncedVenues] = useState(0);

    useEffect(() => {
        loadCounts();
    }, []);

    const loadCounts = async () => {
        try {
            const total = await DatabaseService.getTotalCount();
            const unsynced = await DatabaseService.getUnsyncedCount();
            setTotalVenues(total);
            setUnsyncedVenues(unsynced);
        } catch (error) {
            logger.error('[AddVenue Controller] Error loading counts:', error);
        }
    };

    const addRandomOffset = (lat: number, lon: number, maxOffsetKm: number = 5) => {

        const latOffset = (Math.random() - 0.5) * 2 * (maxOffsetKm / 111);
        const lonOffset = (Math.random() - 0.5) * 2 * (maxOffsetKm / (111 * Math.cos(lat * Math.PI / 180)));
        
        return {
            lat: Number((lat + latOffset).toFixed(4)),
            lon: Number((lon + lonOffset).toFixed(4))
        };
    };

    const handleAddVenue = async (venueData: VenueData) => {
        if (venueData.venueName.trim()) {

            const offsetCoords = addRandomOffset(venueData.lat, venueData.lon);

            logger.log('[AddVenue Controller] Adding venue:', {
                name: venueData.venueName,
                lat: offsetCoords.lat,
                lon: offsetCoords.lon
            });

            try {
                await DatabaseService.addVenue({
                    name: venueData.venueName,
                    lat: offsetCoords.lat,
                    lon: offsetCoords.lon,
                    synced: 0
                });

                await loadCounts();
                setVenueName('');
                logger.log('[AddVenue Controller] Venue added successfully');
            } catch (error) {
                logger.error('[AddVenue Controller] Error adding venue:', error);
            }
        }
    }

    const handleSyncNow = async () => {
        logger.log('[AddVenue Controller] Trying to sync');

        try {
            if (unsyncedVenues > 0) {
                await simulateAPI()
                await DatabaseService.markAllAsSynced();
                await loadCounts();
                
                logger.log('[AddVenue Controller] Sync completed');
                
                // Display native notification
                await Notifications.scheduleNotificationAsync({
                    content: {
                        title: 'Sync Successful',
                        body: `${unsyncedVenues} venues synced successfully`,
                        sound: true,
                    },
                    trigger: null,
                });
            } else {
                logger.log("[AddVenue Controller] No venues to sync")
            }
        } catch (error) {
            logger.warn('[AddVenue Controller] Error syncing:', error);
            
            await Notifications.scheduleNotificationAsync({
                content: {
                    title: 'Sync Failed',
                    body: 'Try again',
                    sound: true,
                },
                trigger: null,
            });
        }
    };
    
    return {
        venueName,
        setVenueName,
        totalVenues,
        unsyncedVenues,
        handleAddVenue,
        handleSyncNow
    };

};