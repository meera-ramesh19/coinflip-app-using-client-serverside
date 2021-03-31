const http = require('http');
const fs = require('fs')
const url = require('url');
const querystring = require('querystring');
const figlet = require('figlet')


const server = http.createServer((req, res) => {
    const page = url.parse(req.url).pathname;
    const params = querystring.parse(url.parse(req.url).query);
    console.log(page);

    function serverSide(filename, contentType, response) {
        fs.readFile(filename, function(err, data) {
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.write(data);
            res.end();
        });
    }
    switch (page) {
        case '/':
            serverSide('index.html', 'text / html', res);
            break;

        case '/api':
        const flipped = Math.floor(Math.random() * 2) == 0 ? "Heads" : "Tails";
        console.log(flipped);
        res.writeHead(200, { 'Content-Type': 'application/json' });
                const objValue = {
                    value:`${flipped}`,
                 };
                 res.end(JSON.stringify(objValue));

        case '/css/style.css':
            // fs.readFile('css/style.css', null,res);
            serverSide('css/style.css', null, res);
            break;
        case '/js/main.js':
            // fs.readFile('js/main.js', 'text/javascript',res);
            serverSide('js/main.js', 'text/javascript', res);
            break;
        default:
            figlet('404!!', function(err, data) {
                if (err) {
                    console.log('Something went wrong...');
                    console.dir(err);
                    return;
                }
                res.write(data);
                res.end();
            });
            break;
    }
});
