const express = require('express');
const path = require('path');
const router = express.Router();

const app = express();

router.get('/*', (req, res) => {

    res.sendFile(path.resolve(__dirname,'index', 'index.html'));
});

app.use('/', router);
app.listen(3333, () => console.log('Server is running'));