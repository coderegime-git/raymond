const https = require('https');

function fetchCards(pageIndex) {
    return new Promise((resolve, reject) => {
        const postData = JSON.stringify({
            gridId: "107e3fcd-3186-4236-bee8-7b1a25f2a3a8",
            contextItemId: "5b445049-d7cf-4017-b61a-c7070a2428c5",
            siteContextItemId: "4e239a5d-3169-476e-91d0-87587e6f6d7e",
            pageIndex: pageIndex,
            pageSize: 50,
            filterTopic: "",
            filterCat: "",
            filterMedia: "",
            filterSearchedTerm: ""
        });

        // Or form-urlencoded
        const urlParams = new URLSearchParams({
            gridId: "107e3fcd-3186-4236-bee8-7b1a25f2a3a8",
            contextItemId: "5b445049-d7cf-4017-b61a-c7070a2428c5",
            siteContextItemId: "4e239a5d-3169-476e-91d0-87587e6f6d7e",
            pageIndex: pageIndex.toString(),
            pageSize: "50",
            filterTopic: "",
            filterCat: "",
            filterMedia: "",
            filterSearchedTerm: ""
        }).toString();

        const options = {
            hostname: 'www.raymondjames.com',
            port: 443,
            path: '/advisorsites/resource/masonrygridloadmoreajax?' + urlParams,
            method: 'GET',
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
                'Accept': '*/*',
                'X-Requested-With': 'XMLHttpRequest',
                'Referer': 'https://www.raymondjames.com/theseilergroup/resources'
            }
        };

        const req = https.request(options, (res) => {
            let data = '';
            res.on('data', (chunk) => data += chunk);
            res.on('end', () => resolve({ status: res.statusCode, data }));
        });

        req.on('error', (e) => reject(e));
        req.end();
    });
}

async function run() {
    try {
        const res = await fetchCards(1);
        console.log("Status:", res.status);
        console.log("Data length:", res.data.length);
        console.log("Preview:", res.data.substring(0, 500));
    } catch(err) {
        console.error("Error:", err);
    }
}

run();
