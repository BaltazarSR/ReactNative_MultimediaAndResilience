import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';
import { Song } from './SongModel';

export type RootStackParamList = {
    Map: undefined;
    Database: undefined;
    VenueRegistration: {
        lat: number;
        lon: number;
    };
    MusicList: undefined;
    MusicPlayer: {
        song: Song
    };
};

export type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export type MusicPlayerRouteProp = RouteProp<RootStackParamList, 'MusicPlayer'>;