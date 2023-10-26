const express = require('express');
const axios = require('axios');

const PORT = process.env.PORT || 3000;
const YESNO_API_URL = 'https://yesno.wtf/api';

const app = express();

app.get('/random', async (req, res) => {
    try {
        const response = await axios.get(YESNO_API_URL);
        if (response.data.answer === 'maybe') {
            res.status(500).json({result: false});
        }
        else {
            res.json({result: true});
        }
    }
    catch(error) {
        console.error(error);
        res.status(500).json({result: false});
    }
});

app.head('/healthz', async (req, res) => {
    try {
        const response = await axios.head(YESNO_API_URL);
        if(response.status === 200) {
            res.sendStatus(200);
        }
        else {
            res.sendStatus(500);
        }
    }
    catch(error) {
        console.error(error);
        res.sendStatus(500);
    }
});

app.listen(PORT, () => {
    console.log(`Server runs on port ${PORT}`);
});