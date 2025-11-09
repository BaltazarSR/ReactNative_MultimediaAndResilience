import { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { NavigationProp } from '../models/RootParamsListModel';
import { Song } from '../models/SongModel';
import { logger } from '../utils/logger';

export const MusicListController = () => {
    const navigation = useNavigation<NavigationProp>();

    const [songs, setSongs] = useState<Song[]>([]);

    useEffect(() => {
        loadSongs();
    }, []);

    const loadSongs = () => {
        logger.log('[MusicList Controller] Loading Songs');
        
        const hardcodedSongs: Song[] = [
            {
                id: 1,
                name: 'Like Him',
                artist: 'Tyler The Creator',
                image: require('../../assets/images/LikeHim.jpg'),
                song: require('../../assets/songs/LikeHim.mp3'),
                duration: 277000
            },
            {
                id: 2,
                name: 'Lose Control',
                artist: 'Teddy Swims',
                image: require('../../assets/images/LoseControl.jpg'),
                song: require('../../assets/songs/LoseControl.mp3'),
                duration: 209000
            },
            {
                id: 3,
                name: 'Make It Happen',
                artist: 'RÜFÜS DU SOL',
                image: require('../../assets/images/MakeItHappen.jpg'),
                song: require('../../assets/songs/MakeItHappen.mp3'),
                duration: 309000
            },
            {
                id: 4,
                name: 'Superhero',
                artist: 'Metro Boomin',
                image: require('../../assets/images/Superhero.jpg'),
                song: require('../../assets/songs/Superhero.mp3'),
                duration: 182000
            },
            {
                id: 5,
                name: 'Your Man',
                artist: 'Joji',
                image: require('../../assets/images/YourMan.png'),
                song: require('../../assets/songs/YourMan.mp3'),
                duration: 161000
            },
            {
                id: 6,
                name: 'Hide',
                artist: 'Juice WRLD',
                image: require('../../assets/images/Hide.jpg'),
                duration: 161000
            }
        ];
        
        setSongs(hardcodedSongs);
    }

    const handleGoBack = () => {
        logger.log('[MusicList Controller] Go back to MapScreen');
        navigation.goBack()
    }

    const handleMusicPlayerNavigation = (song: Song) => {
        logger.log('[MusicList Controller] Navigation to: MusicPlayer');
        navigation.navigate('MusicPlayer', { song });
    }

    return {
        songs,
        handleGoBack,
        handleMusicPlayerNavigation,
    }
}