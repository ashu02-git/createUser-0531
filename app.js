const http = require('http');
const fs = require('fs');
const ejs = require('ejs');
const url = require('url');
const qs = require('querystring');

const index = fs.readFileSync('./index.ejs','utf8');
const createUser = fs.readFileSync('./create-user.ejs','utf8');

let server = http.createServer(getFromCliant);
server.listen(3000);
console.log('Server Start!');

function getFromCliant(req, res) {
    let urlParts = url.parse(req.url, true);

    switch(urlParts.pathname){
        case '/':
            console.log('hello');
            responseIndex(req, res);
            break;

        case '/create-user':
            responeseCreate(req, res);
            break;
        
        default:
            res.writeHead(404, {'Content-Type':'text/plain'});
            res.end('no page...');
            break;
    }
}

function responseIndex(req, res) {
    let content = ejs.render(index, {title: 'ユーザー作成'});

    res.writeHead(200, {'Content-Type':'text/html'});
    res.write(content);
    res.end();
}

function responeseCreate(req, res) {
    if (req.method == 'POST'){
        let user = '';
        let age = 0;

        req.on('data', (data) => {
            user += data;
            console.log(qs.parse(user));
        });

        req.on('end', () =>{
            let postData = qs.parse(user);

            let content = ejs.render(createUser, {
                title: 'ユーザー作成完了',
                name: postData.name,
                age: postData.age
            });

            res.writeHead(200, {'Content-Type':'text/html'});
            res.write(content);
            res.end();
        });
    }
}
