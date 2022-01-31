import React from 'react';
import { useState, useEffect } from 'react';
import YouTube from 'react-youtube';
import { Options } from 'react-youtube';

interface Props {
  videoId: string;
}

const VideoComponent = ({ videoId }: Props) => {
  // https://usehooks.com/useWindowSize/
  const useWindowSize = () => {
    const [windowSize, setWindowSize] = useState({
      width: 0,
      height: 0,
    });

    useEffect(() => {
      function handleResize() {
        setWindowSize({
          width: window.innerWidth,
          height: window.innerHeight,
        });
      }

      window.addEventListener('resize', handleResize);
      handleResize();

      return () => window.removeEventListener('resize', handleResize);
    }, []);

    return windowSize;
  };

  const size = useWindowSize();
  const width = Math.min(size.width * 0.8, 1200);
  const height = (width / 2) * 1.1;
  const opts: Options = {
    height: height.toString(),
    width: width.toString(),
    playerVars: {
      autoplay: 0,
    },
  };

  return <YouTube videoId={videoId} opts={opts} />;
};

export default VideoComponent;
