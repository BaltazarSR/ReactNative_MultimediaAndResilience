import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MapScreen from '../views/screens/MapScreen';
import DatabaseScreen from '../views/screens/DatabaseScreen';
import AddVenueScreen from '../views/screens/AddVenueScreen';
import { RootStackParamList } from '../models/RootParamsListModel';

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
            </Stack.Navigator>
        </NavigationContainer>
    );
}