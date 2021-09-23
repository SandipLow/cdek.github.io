const http = require('http');
const fs = require('fs');
const port = 80;

const filecontent = fs.readFileSync('ibear.html');//-->Enter the name of HTML here
const style = fs.readFileSync('./ibear.css');//-->Enter the name of CSS here
const script = fs.readFileSync('./ibear.js');//-->Enter JS here

const server = http.createServer((req, res) => {
    res.writeHead(200, {'Content-type':"text/html"});
    url = req.url;

    if (url=='/') {
        res.end(filecontent);
    }
    else if (url=='/ibear.js') {
        res.end(script);
    }
    else if (url=='/ibear.css') {
        res.writeHead(200, {'Content-type':"Stylesheet/css"});
        res.end(style);
    }
    else{
        res.statusCode=404;
        res.end(`<h1>404 not found</h1>`)
    }
})

server.listen(port, '127.0.0.1', () => {
    console.log(`Server running on http://127.0.0.1:${port}`);
})