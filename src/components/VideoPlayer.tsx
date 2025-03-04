import React from 'react';
import ReactPlayer from 'react-player';

interface VideoPlayerProps {
  url: string;
  title?: string;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ url, title }) => {
  return (
    <div className="video-player-container">
      <div className="aspect-w-16 aspect-h-9 mb-4">
        <ReactPlayer
          url={url}
          width="100%"
          height="100%"
          controls={true}
          light={false}
          pip={true}
          className="rounded-lg overflow-hidden"
        />
      </div>
      {title && <h3 className="text-lg font-medium text-gray-900 mb-2">{title}</h3>}
    </div>
  );
};

export default VideoPlayer;