import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import { useNavigation } from '@react-navigation/native';
import { useState, useEffect } from 'react';
import DatabaseService from '../services/database/DatabaseService';
import { Venue } from '../services/database/DatabaseService';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export const DatabaseController = () => {
    const navigation = useNavigation<NavigationProp>();

    const [totalVenues, setTotalVenues] = useState(0);
    const [syncedVenues, setSyncedVenues] = useState(0);
    const [unsyncedVenues, setUnsyncedVenues] = useState(0);
    const [activeButton, setActiveButton] = useState<'all' | 'synced' | 'unsynced'>('all');
    const [filteredVenues, setFilteredVenues] = useState<Venue[]>([]);

    useEffect(() => {
        loadData();
    }, []);

    useEffect(() => {
        loadFilteredVenues();
    }, [activeButton]);

    const loadData = async () => {
        await loadCounts();
        await loadFilteredVenues();
    };

    const loadCounts = async () => {
        try {
            const total = await DatabaseService.getTotalCount();
            const synced = await DatabaseService.getSyncedCount();
            const unsynced = await DatabaseService.getUnsyncedCount();
            
            setTotalVenues(total);
            setSyncedVenues(synced);
            setUnsyncedVenues(unsynced);
        } catch (error) {
            console.error('Error loading counts:', error);
        }
    };

    const loadFilteredVenues = async () => {
        try {
            let venues: Venue[] = [];
            
            switch (activeButton) {
                case 'all':
                    venues = await DatabaseService.getAllVenues();
                    break;
                case 'synced':
                    venues = await DatabaseService.getSyncedVenues();
                    break;
                case 'unsynced':
                    venues = await DatabaseService.getUnsyncedVenues();
                    break;
            }
            
            setFilteredVenues(venues);
        } catch (error) {
            console.error('Error loading filtered venues:', error);
        }
    };

    const handleGoBack = () => {
        console.log('Go back to MapScreen');
        navigation.goBack()
    }

    const handleButtonPress = (buttonType: 'all' | 'synced' | 'unsynced') => {
        setActiveButton(buttonType);
    }

    return {
        handleGoBack,
        totalVenues,
        syncedVenues,
        unsyncedVenues,
        activeButton,
        handleButtonPress,
        filteredVenues,
    }
};