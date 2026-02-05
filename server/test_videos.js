const axios = require('axios');

async function testVideos() {
    try {
        // channelId for Nokduro from previous test: 6e06f5e1907f17eff543abd06cb62891
        const channelId = '6e06f5e1907f17eff543abd06cb62891';
        console.log(`Fetching videos for ${channelId}...`);
        const response = await axios.get(`https://api.chzzk.naver.com/service/v1/channels/${channelId}/videos?sortType=LATEST&pagingType=PAGE&page=0&size=20`, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
                'Origin': 'https://chzzk.naver.com',
                'Referer': 'https://chzzk.naver.com/'
            }
        });
        
        console.log('Status:', response.status);
        if (response.data.content && response.data.content.data) {
             console.log('Found videos:', response.data.content.data.length);
             console.log('First video:', response.data.content.data[0]);
        } else {
            console.log('Full data:', JSON.stringify(response.data, null, 2));
        }
    } catch (error) {
        console.error('Error:', error.message);
    }
}

testVideos();
