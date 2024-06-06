const http = require('http');
const fs = require('fs');
const path = require('path');

const handleRequest = (request, response) => {
    let filePath = '.' + request.url;
    if (filePath === './') {
        filePath = './src/index.html';
    } else {
        filePath = './src' + request.url;
    }
    const extname = String(path.extname(filePath)).toLowerCase();
    const mimeTypes = {
        '.html': 'text/html',
        '.css': 'text/css',
        '.js': 'text/javascript',
        '.png': 'image/png',
        '.jpg': 'image/jpg',
        '.gif': 'image/gif',
        '.svg': 'image/svg+xml',
    };

    const contentType = mimeTypes[extname] || 'application/octet-stream';
    fs.readFile(filePath, (err, content) => {
        if (err) {
            if (err.code === 'ENOENT') {
                response.writeHead(404);
                response.end('404 Not Found');
            } else {
                response.writeHead(500);
                response.end('Internal Server Error: ' + err.code);
            }
        } else {
            response.writeHead(200, { 'Content-Type': contentType });
            response.end(content, 'utf-8');
        }
    });
};
const server = http.createServer(handleRequest);
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Serwer uruchomiony na porcie ${PORT}`);
});
