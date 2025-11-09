import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import { BackChevronIcon, PlayIcon, PauseIcon, ForwardIcon, BackwardIcon } from '../components/Icon';
import { MusicPlayerController } from '../../controllers/MusicPlayerController';

export default function MusicPlayerScreen() {

  const {
      currentSong,
      isPlaying,
      position,
      duration,
      progress,
      handleGoBack,
      handlePlay,
      handleBackwards,
      handleForwards
    } = MusicPlayerController();

  if (!currentSong) {
    return (
      <View style={styles.container}>
        <Text>No song selected</Text>
      </View>
    );
  }

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

      <View style={styles.songContainer}>
        <Image
          source={currentSong.image}
          style={styles.albumArtwork}
        />
        <Text style={styles.songTitle}>{currentSong.name}</Text>
        <Text style={styles.artistName}>{currentSong.artist}</Text>

        <View style={styles.progressContainer}>
          <Text style={styles.timeText}>{position}</Text>
          <View style={styles.progressBarBackground}>
            <View 
              style={[
                styles.progressBarFill,
                { width: `${progress}%` }
              ]}
            />
          </View>
          <Text style={styles.timeText}>{duration}</Text>
        </View>
        
        <View style={styles.controlButtonsContainer}>
          <TouchableOpacity
            style={styles.playButton}
            onPress={handleBackwards}
          >
            <BackwardIcon
                size={30}
                color='black'
            />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.playButton}
            onPress={handlePlay}
          >
            {(isPlaying) ? (
              <PauseIcon
                  size={60}
                  color='black'
              />
            ) : (
              <PlayIcon
                size={60}
                color='black'
              />
            )}
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.playButton}
            onPress={handleForwards}
          >
            <ForwardIcon
                size={30}
                color='black'
            />
          </TouchableOpacity>
        </View>
      </View>
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
  songContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  albumArtwork: {
    width: 300,
    height: 300,
    borderRadius: 16,
    marginBottom: 30,
  },
  songTitle: {
    fontSize: 28,
    fontFamily: 'StackSans-Bold',
    color: '#000',
    marginBottom: 10,
  },
  artistName: {
    fontSize: 18,
    fontFamily: 'StackSans-Regular',
    color: '#666',
  },
  progressContainer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 30,
    paddingHorizontal: 20,
    gap: 10,
  },
  progressBarBackground: {
    flex: 1,
    height: 4,
    backgroundColor: '#e0e0e0',
    borderRadius: 2,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: '#000',
    borderRadius: 2,
  },
  timeText: {
    fontSize: 12,
    fontFamily: 'StackSans-Regular',
    color: '#666',
    minWidth: 40,
    textAlign: 'center',
  },
  controlButtonsContainer: {
    marginTop: 50,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 25,
  },
  playButton: {
    padding: 10,
    borderRadius: 100,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
  },
});