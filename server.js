require('dotenv').config();
const express = require('express');
const next = require('next');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
    const server = express();

    server.all('*', (req, res) => {
        return handle(req, res);
    });

    const PORT = process.env.PORT || 3000;
    const HOST = process.env.HOST || '0.0.0.0';
    server.listen(PORT, HOST, () => {
        console.log(`> Запустились на http://${HOST}:${PORT}`);
    });
});
