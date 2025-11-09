import { useState, useEffect, useRef } from 'react';
import { Alert } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { NavigationProp } from '../models/RootParamsListModel';
import { Song } from '../models/SongModel';
import { MusicPlayerRouteProp } from '../models/RootParamsListModel';
import { Audio } from 'expo-av';
import { logger } from '../utils/logger';

export const MusicPlayerController = () => {
    const navigation = useNavigation<NavigationProp>();
    const route = useRoute<MusicPlayerRouteProp>();
    const [currentSong, setCurrentSong] = useState<Song | null>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [position, setPosition] = useState('');
    const [progress, setProgress] = useState(0)
    const [duration, setDuration] = useState('');
    const sound = useRef<Audio.Sound | null>(null);

    useEffect(() => {
        if (route.params?.song) {
            setCurrentSong(route.params.song);
            setDuration(formatTime(route.params.song.duration))
            loadAudio(route.params.song);
            logger.log('[MusicPlayer Controller] Received song:', route.params.song.name);
        }

        return () => {
            unloadAudio();
        };
    }, [route.params]);

    const loadAudio = async (song: Song) => {
        try {
            await Audio.setAudioModeAsync({
                playsInSilentModeIOS: true,
                staysActiveInBackground: true,
            });

            const { sound: newSound } = await Audio.Sound.createAsync(
                song.song,
                { shouldPlay: false },
                onPlaybackStatusUpdate
            );

            sound.current = newSound;
            logger.log('[MusicPlayer Controller] Audio loaded');
        } catch (error) {
            logger.error('[MusicPlayer Controller] Error loading audio:', error);
            Alert.alert(
                'Error Loading Audio',
                'The audio file could not be loaded. Please try again.',
                [
                    {
                        text: 'OK',
                        onPress: handleGoBack
                    }
                ]
            );
        }
    };

    const unloadAudio = async () => {
        if (sound.current) {
            await sound.current.unloadAsync();
            sound.current = null;
        }
    };

    const onPlaybackStatusUpdate = (status: any) => {
        if (status.isLoaded) {
            setProgress(route.params.song.duration > 0 ? (status.positionMillis / route.params.song.duration) * 100 : 0);
            setPosition(formatTime(status.positionMillis));
            setIsPlaying(status.isPlaying);
            logger.log('[MusicPlayer Controller] Playing song:', route.params.song.name);

            if (status.didJustFinish) {
                setIsPlaying(false);
                sound.current?.setPositionAsync(0);
            }
        }
    };

    const handleGoBack = async () => {
        logger.log('[MusicPlayer Controller] Go back to MusicList');
        await unloadAudio();
        navigation.goBack();
    };

    const handlePlay = async () => {
        if (!sound.current) return;

        try {
            if (isPlaying) {
                await sound.current.pauseAsync();
                logger.log('[MusicPlayer Controller] Pause');
            } else {
                await sound.current.playAsync();
                logger.log('[MusicPlayer Controller] Play');
            }
        } catch (error) {
            logger.error('[MusicPlayer Controller] Error playing/pausing:', error);
        }
    };

    const handleBackwards = async () => {
        if (!sound.current) return;

        try {
            const status = await sound.current.getStatusAsync();
            if (status.isLoaded) {
                const newPosition = Math.max(0, status.positionMillis - 10000);
                await sound.current.setPositionAsync(newPosition);
                logger.log('[MusicPlayer Controller] Backwards');
            }
        } catch (error) {
            logger.error('[MusicPlayer Controller] Error seeking backwards:', error);
        }
    };

    const handleForwards = async () => {
        if (!sound.current) return;

        try {
            const status = await sound.current.getStatusAsync();
            if (status.isLoaded && currentSong) {
                const newPosition = Math.min(
                    currentSong.duration * 1000,
                    status.positionMillis + 10000
                );
                await sound.current.setPositionAsync(newPosition);
                logger.log('[MusicPlayer Controller] Forwards');
            }
        } catch (error) {
            logger.error('[MusicPlayer Controller] Error seeking forwards:', error);
        }
    };

    const formatTime = (milliseconds: number) => {
        const totalSeconds = Math.floor(milliseconds / 1000);
        const minutes = Math.floor(totalSeconds / 60);
        const seconds = totalSeconds % 60;
        return `${minutes}:${seconds.toString().padStart(2, '0')}`;
    };

    return {
        currentSong,
        isPlaying,
        position,
        duration,
        progress,
        handleGoBack,
        handlePlay,
        handleBackwards,
        handleForwards
    };
}