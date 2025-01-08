/* eslint-disable react/display-name,@typescript-eslint/no-unused-vars */
import { ForwardedRef, forwardRef } from 'react';
import ReactPlayer from 'react-player/lazy';

interface MyReactPlayerProps {
    playerRef: ForwardedRef<ReactPlayer | null>;
    url: string;
    onReady: (value: boolean) => void;
    onPause: (value: boolean) => void;
    onStart: (value: boolean) => void;
    onEnded: (value: boolean) => Promise<void>;
    onProgress: (value: number) => void;
}

const MyReactPlayer = forwardRef<ReactPlayer | null, MyReactPlayerProps>(
    (
        { playerRef, url, onReady, onPause, onStart, onEnded, onProgress },
        ref
    ) => {
        const handleProgress = (state: { played: number }) => {
            onProgress(Number(state.played.toFixed(2)));
        };

        return (
            <ReactPlayer
                ref={playerRef} // Gắn ref vào ReactPlayer
                url={url}
                controls={true}
                onStart={() => onStart(true)}
                onReady={() => onReady(true)}
                onPause={() => onPause(true)}
                onPlay={() => onPause(false)}
                onEnded={() => onEnded(true)}
                width="100%"
                height="100%"
                onProgress={handleProgress}
                progressInterval={500}
            />
        );
    }
);

export default MyReactPlayer;
