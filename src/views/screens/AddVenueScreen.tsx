import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { AddVenueController } from '../../controllers/AddVenueController';
import { AddVenueScreenProps } from '../../models/AddVenueScreenPropsModel';

export default function AddVenueScreen({ route }: AddVenueScreenProps) {

  const {
    venueName,
    setVenueName,
    totalVenues,
    unsyncedVenues,
    handleAddVenue,
    handleSyncNow
  } = AddVenueController();

  const lat = route?.params?.lat || 0;
  const lon = route?.params?.lon || 0;

  const onAddVenue = () => {
    handleAddVenue({
      venueName,
      lat,
      lon
    });
  };

  const onSyncNow = () => {
    handleSyncNow()
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add a Venue</Text>

      <TextInput
        style={styles.input}
        placeholder="Name of the venue..."
        placeholderTextColor="#999"
        value={venueName}
        onChangeText={setVenueName}
      />

      <TouchableOpacity 
        style={styles.addButton}
        onPress={onAddVenue}
      >
        <Text style={styles.addButtonText}>Click to add</Text>
      </TouchableOpacity>

      <View style={styles.statsContainer}>
        <View style={styles.statBox}>
          <Text style={styles.statNumber}>{totalVenues}</Text>
          <Text style={styles.statLabel}>Total</Text>
        </View>
        
        <View style={styles.statBox}>
          <Text style={[styles.statNumber, styles.unsyncedNumber]}>{unsyncedVenues}</Text>
          <Text style={styles.statLabel}>Unsynced</Text>
        </View>
      </View>

      <TouchableOpacity 
        style={styles.addButton}
        onPress={onSyncNow}
      >
        <Text style={styles.addButtonText}>Click to sync now</Text>
      </TouchableOpacity>

      <View style={styles.infoContainer}>
        <Text style={styles.infoText}>
          Transactions are synced every 15 minutes on the background
        </Text>
      </View>

      <StatusBar style="dark" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fafafa',
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontFamily: 'StackSans-Bold',
    color: '#000',
    marginTop: 20,
    marginBottom: 30,
  },
  input: {
    borderRadius: 22,
    padding: 20,
    fontSize: 18,
    marginBottom: 30,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  addButton: {
    backgroundColor: 'black',
    borderRadius: 100,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 50,
    marginHorizontal: 25
  },
  addButtonText: {
    color: '#fff',
    fontFamily: 'StackSans-Regular',
    fontSize: 18,
    fontWeight: '600',
  },
  statsContainer: {
    borderRadius: 30,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 40,
  },
  statBox: {
    flex: 1,
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 48,
    fontWeight: 'bold',
    color: 'black',
    marginBottom: 5,
  },
  unsyncedNumber: {
    color: 'black',
  },
  statLabel: {
    fontSize: 14,
    fontFamily: 'StackSans-Regular',
    color: '#999',
  },
  infoContainer: {
    flexDirection: 'row',
  },
  infoText: {
    flex: 1,
    fontSize: 13,
    color: '#666',
    fontStyle: 'italic',
    textAlign: 'center',
    lineHeight: 18,
  },
});
