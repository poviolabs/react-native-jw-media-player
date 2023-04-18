import React, {useRef} from 'react';
import {StatusBar, Platform} from 'react-native';
import Player from '../components/Player';
import PlayerContainer from '../components/PlayerContainer';

export default () => {
  const playerRef = useRef([]);
  const toggled = useRef(false);
  const onTime = e => {
    var {position, duration} = e.nativeEvent;
    // eslint-disable-line
    // console.log('onTime was called with: ', position, duration);
    if(!toggled.current){
      let intPosition = parseInt(position);
      if(intPosition === 2){
        playerRef.current?.pause();
        playerRef.current?.play();
        toggled.current = true;
        console.log("Toggled");
      }
    }
  };

  const onFullScreen = () => {
    StatusBar.setHidden(true);
  };

  const onFullScreenExit = () => {
    StatusBar.setHidden(false);
  };

  const renderPlayer = () => {
    return (
      <Player
        ref={playerRef}
        style={{flex: 1}}
        config={{
          license:
            Platform.OS === 'android' ? '2lIcGBOLhVbO5e03gyl/ZDTDRmF36+QtAwVdNlugpwItBkiJmtkzYKBSxOo=' : 'BoE2PBlHT9SWuqa5MCxSHMlZGvwaqoIAg9KzHUZKozPJxmx1mQA34gbXLKU=',
          autostart: true,
          playlist: [
            {
              file: 'https://playertest.longtailvideo.com/adaptive/oceans/oceans.m3u8',
              image: 'https://d3el35u4qe4frz.cloudfront.net/bkaovAYt-480.jpg',
              tracks: [
                {
                  file: 'https://content.jwplatform.com/tracks/41bJbYlM.vtt',
                  label: 'Spanish',
                },
                {
                  file: 'https://content.jwplatform.com/tracks/OfVl3pzA.srt',
                  label: 'Chinese',
                  default: true,
                }
              ]
            },
          ],
          advertising: {
            adClient: 'ima',
            adSchedule: [
              {
                offset: '10',
                tag: 'https://pubads.g.doubleclick.net/gampad/ads?iu=/22859175415/flixsnip-player-ads&description_url=https%3A%2F%2Fflixsnip.com&tfcd=0&npa=0&sz=400x300%7C640x480&gdfp_req=1&output=vast&unviewed_position_start=1&env=vp&impl=s&vad_type=linear'
              },
              {
                offset: '20',
                tag: 'https://pubads.g.doubleclick.net/gampad/ads?iu=/22859175415/flixsnip-player-ads&description_url=https%3A%2F%2Fflixsnip.com&url=https%3A%2F%2Fflixsnip.com&sz=400x300%7C640x480&gdfp_req=1&unviewed_position_start=1&env=vp&vad_type=linear&output=vast'
              }
            ]
          },
          styling: {
            colors: {},
          },
        }}
        onTime={onTime}
        onFullScreen={onFullScreen}
        onFullScreenExit={onFullScreenExit}
      />
    );
  };

  return (
    <PlayerContainer
      children={renderPlayer()}
      text="Welcome to react-native-jw-media-player"
    />
  );
};
