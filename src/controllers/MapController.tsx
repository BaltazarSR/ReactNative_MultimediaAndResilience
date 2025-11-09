import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { useEffect, useState, useCallback } from 'react';
import DatabaseService from '../services/database/DatabaseService';
import { MarkerData } from '../models/MarkerDataModel';
import { NavigationProp } from '../models/RootParamsListModel';

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
        console.log("getting markers")

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
            console.error('Error loading markers:', error);
        }
    };

    const handleDatabaseNavigation = () => {
        console.log('Navigation to: Database');
        navigation.navigate('Database');
    }

    const handleMarkerPress = (markerData: any) => {
        console.log('Marker pressed:', markerData);
    };

    const handleCreateVenuePress = (venueData: any) => {
        console.log('Navigation to AddVenue with coords:', venueData);
        navigation.navigate('VenueRegistration', {
            lat: venueData.lat,
            lon: venueData.lon
        });
    }

    return {
        markers,
        handleDatabaseNavigation,
        handleMarkerPress,
        handleCreateVenuePress,
    }

};