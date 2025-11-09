import { StyleSheet, Text, View, TouchableOpacity, FlatList } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { DatabaseController } from '../../controllers/DatabaseController';
import { BackChevronIcon } from '../components/Icon'

export default function DatabaseScreen() {

  const { 
    handleGoBack,
    totalVenues,
    syncedVenues,
    unsyncedVenues,
    activeButton,
    handleButtonPress,
    filteredVenues
  } = DatabaseController();

  const renderVenueItem = ({ item }: { item: any }) => (
    <View style={styles.venueItem}>
      <View style={styles.venueHeader}>
        <Text style={styles.venueName}>{item.name}</Text>
        <View style={[
          styles.syncBadge, 
          item.synced ? styles.syncedBadge : styles.unsyncedBadge
        ]}>
          <Text style={styles.syncBadgeText}>
            {item.synced ? 'Synced' : 'Unsynced'}
          </Text>
        </View>
      </View>
      <Text style={styles.venueCoords}>
        Lat: {item.lat?.toFixed(4)}, Lon: {item.lon?.toFixed(4)}
      </Text>
      <Text style={styles.venueDate}>
        {new Date(item.created_at).toLocaleString()}
      </Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.backButton}
        onPress={handleGoBack}
      >
        <BackChevronIcon
          size={30}
          color='black'
        />
      </TouchableOpacity>

      <Text style={styles.title}>SQLite Database</Text>
      <Text style={styles.subTitle}>Table: transactions</Text>

      <View style={styles.statsContainer}>
        <View style={styles.statBox}>
          <Text style={styles.statNumber}>{totalVenues}</Text>
          <Text style={styles.statLabel}>Total</Text>
        </View>

        <View style={styles.statBox}>
          <Text style={styles.statNumber}>{syncedVenues}</Text>
          <Text style={styles.statLabel}>Synced</Text>
        </View>
        
        <View style={styles.statBox}>
          <Text style={[styles.statNumber, styles.unsyncedNumber]}>{unsyncedVenues}</Text>
          <Text style={styles.statLabel}>Unsynced</Text>
        </View>
      </View>

      <View style={styles.buttonsContainer}>
        <TouchableOpacity 
          style={[
            styles.button,
            activeButton === 'all' ? styles.activeButton : styles.inactiveButton
          ]}
          onPress={() => handleButtonPress('all')}
        >
          <Text
            style={[
              styles.buttonText,
              activeButton === 'all' ? styles.activeButtonText : styles.inactiveButtonText
            ]}
          >
            All
          </Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[
            styles.button,
            activeButton === 'synced' ? styles.activeButton : styles.inactiveButton
          ]}
          onPress={() => handleButtonPress('synced')}
        >
          <Text 
            style={[
              styles.buttonText,
              activeButton === 'synced' ? styles.activeButtonText : styles.inactiveButtonText
            ]}
          >
            Synced
          </Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[
            styles.button,
            activeButton === 'unsynced' ? styles.activeButton : styles.inactiveButton
          ]}
          onPress={() => handleButtonPress('unsynced')}
        >
          <Text 
            style={[
              styles.buttonText,
              activeButton === 'unsynced' ? styles.activeButtonText : styles.inactiveButtonText
            ]}
          >
            Unsynced
          </Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={filteredVenues}
        renderItem={renderVenueItem}
        keyExtractor={(item) => item.id?.toString() || Math.random().toString()}
        contentContainerStyle={styles.listContainer}
        ListEmptyComponent={
          <Text style={styles.emptyText}>No venues to display</Text>
        }
      />

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
  backButton: {
    marginTop: 50,
    padding: 10,
    alignSelf: 'flex-start',
    borderWidth: 1,
    borderRadius: 100,
    borderColor: '#e0e0e0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  title: {
    fontSize: 28,
    fontFamily: 'StackSans-Bold',
    color: '#000',
    marginTop: 20,
    marginBottom: 10,
  },
  subTitle: {
    fontSize: 14,
    fontFamily: 'StackSans-Regular',
    color: '#666',
    marginBottom: 30,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginBottom: 40,
    gap: 10,
  },
  button: {
    flex: 1,
    borderRadius: 100,
    padding: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  activeButton: {
    backgroundColor: 'black',
  },
  inactiveButton: {
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  buttonText: {
    fontFamily: 'StackSans-Regular',
    fontSize: 12,
    fontWeight: '600',
  },
  activeButtonText: {
    color: '#fff',
  },
  inactiveButtonText: {
    color: '#999',
  },
  statsContainer: {
    borderRadius: 16,
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
  listContainer: {
    paddingBottom: 20,
  },
  venueItem: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },
  venueHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  venueName: {
    fontSize: 18,
    fontFamily: 'StackSans-Bold',
    color: '#000',
    flex: 1,
  },
  syncBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  syncedBadge: {
    backgroundColor: '#e8f5e9',
  },
  unsyncedBadge: {
    backgroundColor: '#fff3e0',
  },
  syncBadgeText: {
    fontSize: 11,
    fontFamily: 'StackSans-Medium',
    color: '#666',
  },
  venueCoords: {
    fontSize: 13,
    fontFamily: 'StackSans-Regular',
    color: '#666',
    marginBottom: 4,
  },
  venueDate: {
    fontSize: 12,
    fontFamily: 'StackSans-Regular',
    color: '#999',
  },
  emptyText: {
    textAlign: 'center',
    fontSize: 16,
    fontFamily: 'StackSans-Regular',
    color: '#999',
    marginTop: 40,
  },
});
