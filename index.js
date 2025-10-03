const http = require('http')
 

let classes = [
  { id: 1, name: "Adishakur ali", address: "yaqshiid" },
  { id: 2, name: "Abdullahi Hussein Mohamed", address: "Hilwaa" }
];

const server = http.createServer((req, res) => {
  res.setHeader('Content-Type', 'application/json');


  if (req.url === '/api/classes' && req.method === 'GET') {
    res.writeHead(200);
    return res.end(JSON.stringify(classes));
  }

  
  if (req.url.startsWith('/api/classes/') && req.method === 'GET') {
    const id = parseInt(req.url.split('/')[3]);
    const classData = classes.find(c => c.id === id);
    if (!classData) {
      res.writeHead(404);
      return res.end(JSON.stringify({ message: "Class not found" }));
    }
    res.writeHead(200);
    return res.end(JSON.stringify(classData));
  }

  if (req.url === '/api/classes' && req.method === 'POST') {
    let body = '';
    req.on('data', chunk => body += chunk);
    req.on('end', () => {
      const data = JSON.parse(body);
      const newClass = {
        id: classes.length + 1,
        name: data.name,
        address: data.address
      };
      classes.push(newClass);
      res.writeHead(201);
      res.end(JSON.stringify(newClass));
    });
    return;
  }


  if (req.url.startsWith('/api/classes/') && req.method === 'PUT') {
    const id = parseInt(req.url.split('/')[3]);
    let body = '';
    req.on('data', chunk => body += chunk);
    req.on('end', () => {
      const data = JSON.parse(body);
      const index = classes.findIndex(c => c.id === id);
      if (index === -1) {
        res.writeHead(404);
        return res.end(JSON.stringify({ message: "Class not found" }));
      }
      classes[index] = { id, name: data.name, address: data.address };
      res.writeHead(200);
      res.end(JSON.stringify(classes[index]));
    });
    return;
  }

 
  if (req.url.startsWith('/api/classes/') && req.method === 'DELETE') {
    const id = parseInt(req.url.split('/')[3]);
    const exists = classes.some(c => c.id === id);
    if (!exists) {
      res.writeHead(404);
      return res.end(JSON.stringify({ message: "Class not found" }));
    }
    classes = classes.filter(c => c.id !== id);
    res.writeHead(200);
    return res.end(JSON.stringify({ message: "Class deleted" }));
  }

  
  res.writeHead(404);
  res.end(JSON.stringify({ message: "Route not found" }));

});

server.listen(3000, () => {
  console.log('Server running on port 3000');
});