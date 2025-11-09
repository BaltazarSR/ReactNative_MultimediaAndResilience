import { StyleSheet, Text, View, TouchableOpacity, FlatList, Image } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { BackChevronIcon } from '../components/Icon'
import { MusicListController } from '../../controllers/MusicListController';

export default function MusicListScreen() {

  const {
    songs,
    handleGoBack,
    handleMusicPlayerNavigation
  } = MusicListController();

  const renderMusicItem = ({ item }: { item: any }) => (
    <TouchableOpacity
      style={styles.musicItem}
      onPress={() => handleMusicPlayerNavigation(item)}
    >
      <Image
        source={item.image}
        style={styles.albumImage}
      />
      <View style={styles.songInfoContainer}>
        <Text style={styles.songName}>{item.name}</Text>
        <Text style={styles.artistName}>{item.artist}</Text>
      </View>
    </TouchableOpacity>
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

      <Text style={styles.title}>Music Library</Text>
      <Text style={styles.subTitle}>Choose a song to play</Text>

      <FlatList
        data={songs}
        renderItem={renderMusicItem}
        keyExtractor={(item) => item.id?.toString() || Math.random().toString()}
        contentContainerStyle={styles.listContainer}
        ListEmptyComponent={
          <Text style={styles.emptyText}>No songs downloaded</Text>
        }
      >

      </FlatList>

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
  listContainer: {
    paddingBottom: 20,
  },
  emptyText: {
    textAlign: 'center',
    fontSize: 16,
    fontFamily: 'StackSans-Regular',
    color: '#999',
    marginTop: 40,
  },
  musicItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    padding: 15,
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },
  albumImage: {
    width: 100,
    height: 100,
    borderRadius: 8,
    marginRight: 15,
  },
  songName: {
    fontSize: 22,
    fontFamily: 'StackSans-Medium',
    color: '#000',
  },
  songInfoContainer: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    gap: 10
  },
  artistName: {
    fontSize: 14,
    fontFamily: 'StackSans-Medium',
    color: '#666',
  }
});