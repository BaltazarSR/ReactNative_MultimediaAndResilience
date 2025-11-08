import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

// Controller
import { MapController } from '../../controllers/MapController';

// Assets
import { PinIcon, DatabaseIcon } from '../components/Icon';

export default function MapScreen() {
  const {
    markers,
    handleDatabaseNavigation,
    handleMarkerPress,
    handleCreateVenuePress
  } = MapController();
  
  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 20.7214,
          longitude: -103.3844,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        {markers.map((marker) => (
          <Marker
            key={marker.id}
            coordinate={{ 
              latitude: marker.lat, 
              longitude: marker.lon 
            }}
            title={marker.title}
            description={marker.description}
            onPress={() => handleMarkerPress({ 
              lat: marker.lat, 
              lng: marker.lon 
            })}
          />
        ))}
      </MapView>
      <View style = {styles.buttonsContainer}>
        <View style={styles.buttonContainer}>
          <TouchableOpacity 
            style={styles.button}
            onPress={() => handleCreateVenuePress({ lat: 20.7214, lon: -103.3844 })}
          >
            <View style={styles.buttonLabel}>
              <Text style={styles.buttonText}>Add a venue</Text>
              <PinIcon
                color='black'
                size={36} 
              />
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity 
            style={styles.button}
            onPress={handleDatabaseNavigation}
          >
            <DatabaseIcon
              color='black'
              size={36} 
            />
          </TouchableOpacity>
        </View>
      </View>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  buttonIcon: {
    width: 24, 
    height: 24, 
    tintColor: 'white'
  },
  button: {
    padding: 12,
    alignItems: 'center',
  },
  buttonText: {
    color: 'black',
    fontSize: 18,
    fontFamily: 'StackSans-Bold',
  },
  buttonContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    borderRadius:100,
    padding: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  buttonsContainer: {
    flexDirection: 'row',
    alignItems: 'stretch',
    justifyContent: 'space-between',
    position: 'absolute',
    bottom:30,
    left: 20,
    right: 20,
  },
  buttonLabel: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 15
  }
});
