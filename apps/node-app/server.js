const http = require('http');
const PY_URL = process.env.PYTHON_URL || 'http://py-app:5000/time';

const server = http.createServer((req, res) => {
  if (req.url === '/health') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    return res.end(JSON.stringify({ status: 'ok' }));
  }

  res.writeHead(200, { 'Content-Type': 'application/json' });

  http.get(PY_URL, (pyRes) => {
    let data = '';
    pyRes.on('data', chunk => data += chunk);
    pyRes.on('end', () => {
      const pyTime = JSON.parse(data).time;
      res.end(JSON.stringify({
        node_time: new Date().toISOString(),
        python_time: pyTime,
        source: 'Node → Python (via K3s Service)'
      }));
    });
  }).on('error', (err) => {
    res.end(JSON.stringify({ error: 'Python unreachable: ' + err.message }));
  });
});

server.listen(3000, () => console.log('Server running on port 3000'));
