import Svg, { Path } from 'react-native-svg';
import { IconProps } from '../../models/IconPropsModel';

export const HomeIcon = ({ size = 24, color = '#fafafa' }: IconProps) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={2}>
    <Path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
    />
  </Svg>
);

export const DatabaseIcon = ({ size = 24, color = '#fafafa' }: IconProps) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={2}>
    <Path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4"
    />
  </Svg>
);

export const PinIcon = ({ size = 24, color = '#fafafa' }: IconProps) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={2}>
    <Path 
      stroke-linecap="round" 
      stroke-linejoin="round" 
      d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" 
    />
    <Path 
      stroke-linecap="round" 
      stroke-linejoin="round" 
      d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" 
    />
  </Svg>
);

export const BackChevronIcon = ({ size = 24, color = '#fafafa' }: IconProps) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={2}>
    <Path 
      stroke-linecap="round" 
      stroke-linejoin="round" 
      d="M15.75 19.5 8.25 12l7.5-7.5" 
    />
  </Svg>
);

export const MusicIcon = ({ size = 24, color = '#fafafa' }: IconProps) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={2}>
    <Path 
      stroke-linecap="round" 
      stroke-linejoin="round" 
      d="m9 9 10.5-3m0 6.553v3.75a2.25 2.25 0 0 1-1.632 2.163l-1.32.377a1.803 1.803 0 1 1-.99-3.467l2.31-.66a2.25 2.25 0 0 0 1.632-2.163Zm0 0V2.25L9 5.25v10.303m0 0v3.75a2.25 2.25 0 0 1-1.632 2.163l-1.32.377a1.803 1.803 0 0 1-.99-3.467l2.31-.66A2.25 2.25 0 0 0 9 15.553Z"
    />
  </Svg>
);

export const PlayIcon = ({ size = 24, color = '#fafafa' }: IconProps) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill={color} stroke="none" strokeWidth={2}>
    <Path 
      fill-rule="evenodd" 
      d="M4.5 5.653c0-1.427 1.529-2.33 2.779-1.643l11.54 6.347c1.295.712 1.295 2.573 0 3.286L7.28 19.99c-1.25.687-2.779-.217-2.779-1.643V5.653Z" 
      clip-rule="evenodd"
    />
  </Svg>
);

export const PauseIcon = ({ size = 24, color = '#fafafa' }: IconProps) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill={color} stroke="none" strokeWidth={2}>
    <Path 
      fill-rule="evenodd" 
      d="M6.75 5.25a.75.75 0 0 1 .75-.75H9a.75.75 0 0 1 .75.75v13.5a.75.75 0 0 1-.75.75H7.5a.75.75 0 0 1-.75-.75V5.25Zm7.5 0A.75.75 0 0 1 15 4.5h1.5a.75.75 0 0 1 .75.75v13.5a.75.75 0 0 1-.75.75H15a.75.75 0 0 1-.75-.75V5.25Z" 
      clip-rule="evenodd" 
    />
  </Svg>
);

export const ForwardIcon = ({ size = 24, color = '#fafafa' }: IconProps) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill={color} stroke="none" strokeWidth={2}>
    <Path 
      d="M5.055 7.06C3.805 6.347 2.25 7.25 2.25 8.69v8.122c0 1.44 1.555 2.343 2.805 1.628L12 14.471v2.34c0 1.44 1.555 2.343 2.805 1.628l7.108-4.061c1.26-.72 1.26-2.536 0-3.256l-7.108-4.061C13.555 6.346 12 7.249 12 8.689v2.34L5.055 7.061Z"
    />
  </Svg>
);

export const BackwardIcon = ({ size = 24, color = '#fafafa' }: IconProps) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill={color} stroke="none" strokeWidth={2}>
    <Path 
      d="M9.195 18.44c1.25.714 2.805-.189 2.805-1.629v-2.34l6.945 3.968c1.25.715 2.805-.188 2.805-1.628V8.69c0-1.44-1.555-2.343-2.805-1.628L12 11.029v-2.34c0-1.44-1.555-2.343-2.805-1.628l-7.108 4.061c-1.26.72-1.26 2.536 0 3.256l7.108 4.061Z"
    />
  </Svg>
);
