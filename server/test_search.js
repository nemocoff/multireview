const axios = require('axios');

async function testSearch() {
    try {
        const keyword = '녹두로';
        console.log(`Searching for ${keyword}...`);
        const response = await axios.get(`https://api.chzzk.naver.com/service/v1/search/channels?keyword=${encodeURIComponent(keyword)}&offset=0&size=12`, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
                'Origin': 'https://chzzk.naver.com',
                'Referer': 'https://chzzk.naver.com/'
            }
        });
        
        console.log('Status:', response.status);
        console.log('Data structure keys:', Object.keys(response.data));
        if (response.data.content) {
             console.log('Content keys:', Object.keys(response.data.content));
             if (response.data.content.data) {
                 console.log('Found channels:', response.data.content.data.length);
                 console.log('First channel:', response.data.content.data[0]);
             }
        } else {
            console.log('Full data:', JSON.stringify(response.data, null, 2));
        }
    } catch (error) {
        console.error('Error:', error.message);
        if (error.response) {
            console.error('Response status:', error.response.status);
            console.error('Response data:', error.response.data);
        }
    }
}

testSearch();
