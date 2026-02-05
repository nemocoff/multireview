const axios = require('axios');

async function testVideoEmbed() {
    // Valid video ID from previous test: 11599416 (videoNo) or 96C735F30E658451B3872780974B2E7A6B6B (videoId)
    const videoNo = 11599416; // Integer ID
    const videoIdString = '96C735F30E658451B3872780974B2E7A6B6B'; // String ID

    // URL used in Client: https://chzzk.naver.com/embed/video/${videoNo}
    
    // We can't easily test if an embed URL works via Node.js as it returns HTML
    // But we can check if the video page itself exists
    
    console.log('Testing access to video page...');
    
    try {
        const url = `https://chzzk.naver.com/video/${videoNo}`;
        console.log(`Checking URL: ${url}`);
        const response = await axios.get(url, {
             headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
            }
        });
        console.log(`Status for videoNo ${videoNo}:`, response.status);
    } catch (error) {
        console.error(`Error for videoNo ${videoNo}:`, error.message);
    }
    
    try {
        const url = `https://chzzk.naver.com/video/${videoIdString}`;
        console.log(`Checking URL: ${url}`);
        const response = await axios.get(url, {
             headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
            }
        });
        console.log(`Status for videoIdString ${videoIdString}:`, response.status);
    } catch (error) {
        console.error(`Error for videoIdString ${videoIdString}:`, error.message);
    }
}

testVideoEmbed();
