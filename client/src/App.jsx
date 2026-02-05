import React, { useState, useEffect } from 'react';
import { FaSearch, FaTimes, FaPlay, FaUser, FaStar, FaRegStar } from 'react-icons/fa';
import './index.css';

function App() {
  const [urls, setUrls] = useState(() => {
      const saved = localStorage.getItem('chzzk-layout');
      return saved ? JSON.parse(saved) : [];
  });
  
  useEffect(() => {
      localStorage.setItem('chzzk-layout', JSON.stringify(urls));
  }, [urls]);

  const [input, setInput] = useState('');
  
  // Search & Modal States
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [keyword, setKeyword] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [selectedChannel, setSelectedChannel] = useState(null);
  const [channelVideos, setChannelVideos] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // Favorites
  const [favorites, setFavorites] = useState(() => {
      const saved = localStorage.getItem('chzzk-favorites');
      return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
      localStorage.setItem('chzzk-favorites', JSON.stringify(favorites));
  }, [favorites]);

  const toggleFavorite = (e, channel) => {
    e.stopPropagation();
    const exists = favorites.find(f => f.channelId === channel.channelId);
    if (exists) {
        setFavorites(favorites.filter(f => f.channelId !== channel.channelId));
    } else {
        setFavorites([...favorites, channel]);
    }
  };

  const handleFavoriteClick = async (channel) => {
      setIsSearchOpen(true);
      await handleChannelClick(channel);
      setIsMenuOpen(false); // Close sidebar
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!keyword.trim()) return;
    
    setIsLoading(true);
    try {
      const response = await fetch(`http://localhost:5000/api/search?keyword=${keyword}`);
      const data = await response.json();
      // data.content.data is array of { channel: {...} } objects
      // We map it to extract the inner channel object
      const channels = data.content?.data?.map(item => item.channel) || [];
      setSearchResults(channels);
    } catch (error) {
      console.error("Search failed", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleChannelClick = async (channel) => {
    setSelectedChannel(channel);
    setIsLoading(true);
    try {
        const response = await fetch(`http://localhost:5000/api/channels/${channel.channelId}/videos`);
        const data = await response.json();
        setChannelVideos(data.content?.data || []);
    } catch (error) {
        console.error("Fetch videos failed", error);
    } finally {
        setIsLoading(false);
    }
  };

  const handleVideoSelect = (video) => {
    // Try using the direct video URL as embed seems unstable/undocumented for VODs
    // If Chzzk supports oEmbed or specific embed URL later, we can update this.
    // For now, using the main video page URL with videoNo
    const embedUrl = `https://chzzk.naver.com/video/${video.videoNo}`;
    
    // Prevent duplicates
    if (!urls.includes(embedUrl)) {
        setUrls(prev => [...prev, embedUrl]);
    }
    
    // Do NOT close modals to allow multiple selections
    // setIsSearchOpen(false);
    // setSelectedChannel(null);
    // setChannelVideos([]);
  };

  // Toggle Menu State
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const addUrl = () => {
    if (input) {
      let finalUrl = input;
      // If user enters just a number, assume it's a videoNo
      if (/^\d+$/.test(input)) {
          finalUrl = `https://chzzk.naver.com/video/${input}`;
      } else if (input.includes('chzzk.naver.com/video/')) {
          // If it's already a correct URL, use it as is?
          // Or ensure it doesn't have extra query params?
          // Let's just use what they pasted if it looks right, or extract ID to be safe
          const parts = input.split('/');
          const videoId = parts[parts.length - 1].split('?')[0]; // remove query params
          finalUrl = `https://chzzk.naver.com/video/${videoId}`;
      }
      
      setUrls([...urls, finalUrl]);
      setInput('');
      // Optional: Close menu after adding?
      // setIsMenuOpen(false); 
    }
  };

  return (
    <div className="app-container">
      {/* Floating Toggle Button */}
      <button 
        className={`menu-toggle-btn ${isMenuOpen ? 'active' : ''}`} 
        onClick={() => setIsMenuOpen(!isMenuOpen)}
      >
        {isMenuOpen ? <FaTimes /> : <FaSearch />}
      </button>

      {/* Slide-out Menu */}
      <div className={`sidebar-menu ${isMenuOpen ? 'open' : ''}`}>
         <div className="sidebar-header">
            <h1 className="logo-text">Chzzk MultiReview</h1>
         </div>
         
         <div className="sidebar-content">
            <button className="sidebar-action-btn" onClick={() => { setIsSearchOpen(true); setIsMenuOpen(false); }}>
                <FaSearch /> 방송인 검색
            </button>

            
            <div className="sidebar-favorites-section">
                <span className="sidebar-label">즐겨찾기</span>
                {favorites.length === 0 && <span className="empty-fav">채널을 검색해서 추가해보세요.</span>}
                <div className="fav-list">
                    {favorites.map(fav => (
                        <div key={fav.channelId} className="fav-item" onClick={() => handleFavoriteClick(fav)}>
                            <img src={fav.channelImageUrl || 'data:image/svg+xml;base64,...'} 
                                 onError={(e) => {e.target.style.display='none'}}
                                 alt=""
                            />
                            <span>{fav.channelName}</span>
                        </div>
                    ))}
                </div>
            </div>
            
            <div className="sidebar-divider"></div>
            
            <div className="sidebar-input-section">
                <span>URL 직접 추가</span>
                <input 
                    value={input} 
                    onChange={(e) => setInput(e.target.value)} 
                    placeholder="URL 또는 영상 ID"
                />
                <button className="add-btn" onClick={addUrl}>추가</button>
            </div>
         </div>
      </div>

      <div className="grid-container" style={{
        gridTemplateColumns: `repeat(${urls.length <= 1 ? 1 : Math.ceil(Math.sqrt(urls.length))}, 1fr)`,
        gridTemplateRows: `repeat(${urls.length === 0 ? 1 : Math.ceil(urls.length / (urls.length <= 1 ? 1 : Math.ceil(Math.sqrt(urls.length))))}, 1fr)`
      }}>
        {urls.length === 0 && <div className="empty-state">영상을 추가하거나 채널을 검색하세요.</div>}
        {urls.map((url, index) => (
          <div key={index} className="video-frame">
             <iframe 
                src={url} 
                width="100%" 
                height="100%" 
                frameBorder="0" 
                scrolling="no"
                style={{ overflow: 'hidden' }}
                allowFullScreen
                allow="autoplay; encrypted-media"
              ></iframe>
             <button className="remove-btn" onClick={() => {
                const newUrls = urls.filter((_, i) => i !== index);
                setUrls(newUrls);
             }}><FaTimes /></button>
          </div>
        ))}
      </div>

      {isSearchOpen && (
        <div className="modal-overlay" onClick={() => setIsSearchOpen(false)}>
            <div className="modal-content" onClick={e => e.stopPropagation()}>
                <div className="modal-header">
                    <h2>채널 검색</h2>
                    <button className="close-btn" onClick={() => setIsSearchOpen(false)}><FaTimes /></button>
                </div>
                
                {!selectedChannel ? (
                    <div className="modal-body-split">
                        <div className="modal-side-favs">
                            <h3 className="modal-fav-title">⭐ 즐겨찾기</h3>
                            <div className="fav-list-modal">
                                {favorites.length === 0 && <div className="empty-fav-small">즐겨찾는 채널이 없습니다.</div>}
                                {favorites.map(fav => (
                                    <div key={fav.channelId} className="fav-item-modal" onClick={() => handleChannelClick(fav)}>
                                        <img src={fav.channelImageUrl || 'data:image/svg+xml;base64,...'} 
                                            onError={(e) => {e.target.style.display='none'}}
                                            alt=""
                                        />
                                        <span>{fav.channelName}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="modal-search-area">
                            <form onSubmit={handleSearch} className="search-form">
                                <input 
                                    value={keyword}
                                    onChange={(e) => setKeyword(e.target.value)}
                                    placeholder="방송인 닉네임 검색"
                                    autoFocus
                                />
                                <button type="submit"><FaSearch /></button>
                            </form>
                            <div className="results-list">
                                {isLoading ? <div className="loading">검색 중...</div> : null}
                                {searchResults.map(channel => (
                                    <div key={channel.channelId} className="channel-item" onClick={() => handleChannelClick(channel)}>
                                        <img 
                                            src={channel.channelImageUrl || 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="%23cccccc"%3E%3Cpath d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"/%3E%3C/svg%3E'} 
                                            alt={channel.channelName} 
                                            onError={(e) => {
                                                e.target.onerror = null; 
                                                e.target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="%23cccccc"%3E%3Cpath d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"/%3E%3C/svg%3E';
                                            }}
                                        />
                                        <div className="channel-info">
                                            <div className="channel-name">{channel.channelName}</div>
                                            {/* <div className="channel-desc">{channel.channelDescription}</div> */}
                                        </div>
                                        <button className="fav-btn" onClick={(e) => toggleFavorite(e, channel)}>
                                            {favorites.find(f => f.channelId === channel.channelId) ? <FaStar color="#ffd700" /> : <FaRegStar />}
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="video-selector">
                         <div className="modal-sub-header">
                            <button className="back-btn" onClick={() => setSelectedChannel(null)}>← 뒤로</button>
                            <h3>{selectedChannel.channelName}의 다시보기</h3>
                         </div>
                         <div className="video-grid">
                            {isLoading ? <div className="loading">로딩 중...</div> : null}
                            {channelVideos.length === 0 && !isLoading && <div>영상이 없습니다.</div>}
                            {channelVideos.map(video => (
                                <div key={video.videoNo} className="video-item" onClick={() => handleVideoSelect(video)}>
                                    <div className="video-thumb">
                                        <img src={video.thumbnailImageUrl} alt={video.videoTitle} />
                                        <span className="video-duration">{video.duration}</span>
                                    </div>
                                    <div className="video-title">{video.videoTitle}</div>
                                </div>
                            ))}
                         </div>
                    </div>
                )}
            </div>
        </div>
      )}
    </div>
  );
}

export default App;
