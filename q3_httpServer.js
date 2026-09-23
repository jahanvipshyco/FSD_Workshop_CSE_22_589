// Q3. Simple HTTP Server - Tea Stall
const http = require('http');

const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('Welcome to NodeJS!');
});

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Tea stall server running at http://localhost:${PORT}/`);
});
