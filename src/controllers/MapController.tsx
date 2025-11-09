import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { useEffect, useState, useCallback } from 'react';
import DatabaseService from '../services/database/DatabaseService';
import { MarkerData } from '../models/MarkerDataModel';
import { NavigationProp } from '../models/RootParamsListModel';
import { logger } from '../utils/logger';

export const MapController = () => {
    const navigation = useNavigation<NavigationProp>();

    const [markers, setMarkers] = useState<MarkerData[]>([]);

    useEffect(() => {
        getMarkers();
    }, []);

    useFocusEffect(
        useCallback(() => {
            getMarkers();
        }, [])
    );

    const getMarkers = async () => {
        logger.log("[Map Controller] Getting markers")

        try {
            const venues = await DatabaseService.getAllVenues();
            const markersData: MarkerData[] = venues.map(venue => ({
                id: venue.id!.toString(),
                lat: venue.lat,
                lon: venue.lon,
                title: venue.name,
                description: venue.synced ? 'Synced' : 'Not synced'
            }));
            setMarkers(markersData);
        } catch (error) {
            logger.error('[Map Controller] Error loading markers:', error);
        }
    };

    const handleMusicListNavigation = () => {
        logger.log('[Map Controller] Navigation to: MusicList');
        navigation.navigate('MusicList');
    }

    const handleDatabaseNavigation = () => {
        logger.log('[Map Controller] Navigation to: Database');
        navigation.navigate('Database');
    }

    const handleMarkerPress = (markerData: any) => {
        logger.log('[Map Controller] Marker pressed:', markerData);
    };

    const handleCreateVenuePress = (venueData: any) => {
        logger.log('[Map Controller] Navigation to AddVenue with coords:', venueData);
        navigation.navigate('VenueRegistration', {
            lat: venueData.lat,
            lon: venueData.lon
        });
    }

    return {
        markers,
        handleMusicListNavigation,
        handleDatabaseNavigation,
        handleMarkerPress,
        handleCreateVenuePress,
    }

};