const http = require('http');
const url = require('url');

const PORT = process.env.PORT || 3000;
const VERIFY_TOKEN = 'sales_agent_secret_token';

const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true);
  
  if (parsedUrl.pathname === '/api/webhook/whatsapp') {
    if (req.method === 'GET') {
      const mode = parsedUrl.query['hub.mode'];
      const token = parsedUrl.query['hub.verify_token'];
      const challenge = parsedUrl.query['hub.challenge'];
      
      if (mode === 'subscribe' && token === VERIFY_TOKEN) {
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        return res.end(challenge);
      }
      res.writeHead(403);
      return res.end('Forbidden');
    }
    
    if (req.method === 'POST') {
      res.writeHead(200);
      return res.end('EVENT_RECEIVED');
    }
  }
  
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('Servidor de WhatsApp IA HS activo');
});

server.listen(PORT, () => console.log('Servidor en puerto ' + PORT));
