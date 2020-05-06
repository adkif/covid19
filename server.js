const express = require('express');

const app = express();

app.use(express.static('./dist/covid19'));

app.get('/*', (req, res) =>
    res.sendFile('index.html', { root: 'dist/covid19/' }),
);

app.listen(process.env.PORT || 8080);