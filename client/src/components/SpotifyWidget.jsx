import { useState, useEffect } from 'react';

const SpotifyWidget = () => {
  const [lastFmData, setLastFmData] = useState(null);

  // Last.fm recent tracks fetcher
  useEffect(() => {
    const fetchLastFm = async () => {
      const apiKey = import.meta.env.VITE_LASTFM_API_KEY;
      const username = import.meta.env.VITE_LASTFM_USERNAME;
      
      if (!apiKey || !username) return;

      try {
        const res = await fetch(`https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=${username}&api_key=${apiKey}&format=json&limit=1`);
        const data = await res.json();
        const track = data.recenttracks?.track?.[0];
        
        if (track) {
          const isPlaying = track['@attr']?.nowplaying === 'true';
          let timeAgoStr = 'Listening now';
          
          if (!isPlaying && track.date?.uts) {
            const trackDate = new Date(parseInt(track.date.uts) * 1000);
            const now = new Date();
            const diffMs = now - trackDate;
            const diffHrs = Math.floor(diffMs / (1000 * 60 * 60));
            const diffMins = Math.floor(diffMs / (1000 * 60));
            
            if (diffHrs >= 24) {
              const diffDays = Math.floor(diffHrs / 24);
              timeAgoStr = `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
            } else if (diffHrs > 0) {
              timeAgoStr = `${diffHrs} hr${diffHrs > 1 ? 's' : ''} ago`;
            } else if (diffMins > 0) {
              timeAgoStr = `${diffMins} min${diffMins > 1 ? 's' : ''} ago`;
            } else {
              timeAgoStr = 'Just now';
            }
          }
          
          // Get the highest resolution image available (extralarge, large, medium)
          let imgUrl = track.image?.find(img => img.size === 'extralarge')?.['#text'] 
                      || track.image?.find(img => img.size === 'large')?.['#text'] 
                      || track.image?.find(img => img.size === 'medium')?.['#text'];
          
          if (!imgUrl || imgUrl.trim() === '') {
             imgUrl = "https://i.scdn.co/image/ab67616d00001e028b8577fb739d48b1115bc550"; // Solid fallback
          }
          
          setLastFmData({
            name: track.name,
            artist: track.artist['#text'],
            image: imgUrl,
            url: track.url,
            timeAgo: timeAgoStr,
            isPlaying
          });
        }
      } catch (err) {
        console.error("Failed to fetch Last.fm data:", err);
      }
    };
    
    fetchLastFm();
    const interval = setInterval(fetchLastFm, 60000); // Check every minute
    return () => clearInterval(interval);
  }, []);

  return (
    <a 
      href={lastFmData?.url || "#"} 
      target="_blank" 
      rel="noopener noreferrer"
      className="group mt-8 flex flex-col gap-3 mb-2 w-full max-w-[300px] bg-[var(--bg-secondary)]/40 p-4 rounded-2xl border border-[var(--border-primary)] mx-auto lg:mx-0 shadow-lg backdrop-blur-md transition-all duration-300 hover:bg-[var(--bg-secondary)]/80 hover:border-green-500/30 hover:shadow-green-500/10 hover:-translate-y-1 relative overflow-hidden"
    >
      {/* Background glow effect on hover */}
      <div className="absolute inset-0 bg-gradient-to-r from-green-500/0 via-green-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl pointer-events-none"></div>

      <div className="flex justify-between items-center w-full z-10">
        <div className="flex items-center gap-1.5">
          <svg viewBox="0 0 24 24" className="w-4 h-4 text-[#1DB954]" fill="currentColor">
            <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.6.18-1.2.72-1.38 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" />
          </svg>
          <p className="text-[var(--text-muted)] text-[10px] tracking-[0.2em] uppercase font-bold text-left">
            {lastFmData?.isPlaying ? 'Now Playing' : 'Last Played'}
          </p>
        </div>
        
        {lastFmData && (
          <div className="flex items-center gap-2">
            {lastFmData.isPlaying && (
              <div className="flex items-end gap-[2px] h-2.5">
                <span className="w-[3px] bg-[#1DB954] rounded-sm animate-[bounce_1s_infinite_0s] h-full"></span>
                <span className="w-[3px] bg-[#1DB954] rounded-sm animate-[bounce_1s_infinite_0.2s] h-[60%]"></span>
                <span className="w-[3px] bg-[#1DB954] rounded-sm animate-[bounce_1s_infinite_0.4s] h-[80%]"></span>
              </div>
            )}
            <span className="text-[10px] font-semibold text-[var(--text-secondary)]">
              {lastFmData.timeAgo}
            </span>
          </div>
        )}
      </div>

      <div className="flex items-center gap-3 text-left z-10">
        <div className="relative shrink-0">
          <img 
            src={lastFmData ? lastFmData.image : "https://i.scdn.co/image/ab67616d00001e028b8577fb739d48b1115bc550"} 
            alt={lastFmData ? lastFmData.name : "Track"} 
            className={`w-14 h-14 rounded-lg object-cover shadow-md border border-[var(--border-primary)] transition-transform duration-500 group-hover:scale-105 group-hover:rotate-3 ${lastFmData?.isPlaying ? ' rounded-full scale-105' : ''}`}
          />
          {lastFmData?.isPlaying && (
            <div className="absolute inset-0 rounded-full border border-[#1DB954]/50 animate-pulse pointer-events-none scale-105"></div>
          )}
        </div>
        <div className="flex flex-col justify-center overflow-hidden min-w-0">
          <span className="text-[var(--text-primary)] text-sm sm:text-base font-bold truncate group-hover:text-[#1DB954] transition-colors">
            {lastFmData ? lastFmData.name : "Error 404 to load"}
          </span>
          <span className="text-[var(--text-muted)] text-xs sm:text-sm truncate opacity-80 font-medium">
            {lastFmData ? lastFmData.artist : "Fail to load"}
          </span>
        </div>
      </div>
    </a>
  );
};

export default SpotifyWidget;
