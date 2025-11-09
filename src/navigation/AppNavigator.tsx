import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList } from '../models/RootParamsListModel';
import MapScreen from '../views/screens/MapScreen';
import DatabaseScreen from '../views/screens/DatabaseScreen';
import AddVenueScreen from '../views/screens/AddVenueScreen';
import MusicListScreen from '../views/screens/MusicListScreen';
import MusicPlayerScreen from '../views/screens/MusicPlayerScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function AppNavigator() {
    return (
        <NavigationContainer>
            <Stack.Navigator 
            initialRouteName="Map"
            screenOptions={{
                headerShown: false,
            }}
            >
                <Stack.Screen 
                    name="Map" 
                    component={MapScreen}
                    options={{ title: 'Venues Map' }}
                />
                <Stack.Screen
                    name="Database"
                    component={DatabaseScreen}
                    options={{title: 'Database'}}
                />
                <Stack.Screen
                    name="VenueRegistration"
                    component={AddVenueScreen}
                    options={{
                        presentation: 'modal',
                    }}
                />
                <Stack.Screen
                    name="MusicList"
                    component={MusicListScreen}
                    options={{title: 'MusicList'}}
                />
                <Stack.Screen
                    name="MusicPlayer"
                    component={MusicPlayerScreen}
                    options={{title: 'MusicPlayer'}}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
}