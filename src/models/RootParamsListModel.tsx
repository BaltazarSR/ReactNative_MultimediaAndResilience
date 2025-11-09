import { NativeStackNavigationProp } from '@react-navigation/native-stack';

export type RootStackParamList = {
    Map: undefined;
    Database: undefined;
    VenueRegistration: {
        lat: number;
        lon: number;
    };
};

export type NavigationProp = NativeStackNavigationProp<RootStackParamList>;