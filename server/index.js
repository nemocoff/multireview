const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const axios = require('axios');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Check Chzzk API Configuration
const CHZZK_CLIENT_ID = process.env.CHZZK_CLIENT_ID;
const CHZZK_CLIENT_SECRET = process.env.CHZZK_CLIENT_SECRET;

if (CHZZK_CLIENT_ID) {
    console.log('Chzzk Client ID configured (Reserved for Open API features)');
} else {
    console.log('Chzzk Client ID not found (Using Unofficial API for all features)');
}

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Multireview Server is running');
});

// Proxy for Channel Search
app.get('/api/search', async (req, res) => {
  try {
    const { keyword } = req.query;
    if (!keyword) {
      return res.status(400).json({ error: 'Keyword is required' });
    }
    
    // Chzzk unofficial API endpoint
    const response = await axios.get(`https://api.chzzk.naver.com/service/v1/search/channels?keyword=${encodeURIComponent(keyword)}&offset=0&size=12`, {
        headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
            'Origin': 'https://chzzk.naver.com',
            'Referer': 'https://chzzk.naver.com/'
        }
    });
    
    res.json(response.data);
  } catch (error) {
    console.error('Search API Error:', error.message);
    res.status(500).json({ error: 'Failed to search channels' });
  }
});

// Proxy for Channel Videos
app.get('/api/channels/:channelId/videos', async (req, res) => {
  try {
    const { channelId } = req.params;
    
    // Chzzk unofficial API endpoint for videos
    const response = await axios.get(`https://api.chzzk.naver.com/service/v1/channels/${channelId}/videos?sortType=LATEST&pagingType=PAGE&page=0&size=50`, {
        headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
            'Origin': 'https://chzzk.naver.com',
            'Referer': 'https://chzzk.naver.com/'
        }
    });
    
    res.json(response.data);
  } catch (error) {
    console.error('Videos API Error:', error.message);
    res.status(500).json({ error: 'Failed to fetch videos' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
