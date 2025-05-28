import { useRef, useState, useEffect } from 'react';
import { MdPlayArrow, MdPause} from 'react-icons/md';

const ChatAudioPlayer = ({ audioUrl }) => {
    const audioRef = useRef(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [progress, setProgress] = useState(0);
  
    const togglePlayPause = () => {
      if (!audioRef.current) return;
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    };
  
    useEffect(() => {
      const audio = audioRef.current;
      if (!audio) return;
  
      const updateProgress = () => {
        if (audio.duration) {
          setProgress((audio.currentTime / audio.duration) * 100);
        }
      };
  
      audio.addEventListener('timeupdate', updateProgress);
      audio.addEventListener('ended', () => {
        setIsPlaying(false);
        setProgress(0);
      });
  
      return () => {
        audio.removeEventListener('timeupdate', updateProgress);
        audio.removeEventListener('ended', () => {});
      };
    }, []);
  
    return (
      <div style={{ 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent:'center',
        gap: '10px', 
        padding: '5px', 
        borderRadius: '20px', 
        width: '200px'
      }}>
        <button 
          onClick={togglePlayPause} 
          style={{ 
            background: 'none', 
            border: 'none', 
            fontSize: '30px', 
            cursor: 'pointer' 
          }}
        >
          {isPlaying ? <MdPause/> : <MdPlayArrow/>}
        </button>
  
        <div style={{ flexGrow: 1, height: '5px', marginTop:'10px', background: '#ccc', borderRadius: '2px', overflow: 'hidden' }}>
          <div style={{ width: `${progress}%`, height: '100%', background: '#4FBBB4' }} />
        </div>
        <audio ref={audioRef} src={audioUrl} preload="auto" />
      </div>
    );
};

export default ChatAudioPlayer;
