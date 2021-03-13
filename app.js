

var http = require('http');
var fs = require("fs");
var url = require("url");

function serveStaticFile(res, path, contentType, responseCode) {
    if (!responseCode) responseCode = 200;
    fs.readFile(__dirname + path, function(err, data) {
        if (err) {
            res.writeHead(500, {"Content-Type":"text/plain"})
            res.end("500 - Internal error")
        }
        else {
            res.writeHead(responseCode, {"Content-Type": contentType})
            res.end(data)
        }
    })
}

function css(req, res) {
    if (req.url == '/style.css') {
      response.writeHead(200, {'Content-type' : 'text/css'});
      var fileContents = fs.readFileSync('./style.css','utf8');
      res.write(fileContents);
    }
  }  

//http.createServer(function (req, res) {
//    var path = req.url.replace(/\/?(?:\?.*)?$/ ,"").toLowerCase()
//    switch (path) {
//        case "/style.css" :
//            response.writeHead(200, {"Content-Type": "text/css"});
//            response.write(cssFile);
//            break;
//        default :    
//            response.writeHead(200, {"Content-Type": "text/html"});
//            response.write(htmlFile);
//           break;
//   }
//})


//http.createServer(function (request, responce) {
//    if (request.url == '/style.css'){
//    const css = fs.readFileSync('/style.css', 'utf8');
//    responce.end(css)
//  }else {
//      const html = fs.readFileSync('/index.html', 'utf8')
//      responce.end(html);
//    }  
//  });


http.createServer(function(req,res){
    var path = req.url.replace(/\/?(?:\?.*)?$/ ,"").toLowerCase()
    switch(path) {
        case "":
            serveStaticFile(res, "/index.html", "text/html")
            break;
        case "/about":
            serveStaticFile(res, "/about.html", "text/html")
            break;
        case "/img/gallery/study":
            serveStaticFile(res, "/img/gallery/study.jpg", "image/jpeg")
            break;
        case "/img/gallery/graduation":
            serveStaticFile(res, "/img/gallery/graduation.jpg", "image/jpeg")
            break;
        case "/video/memes":
            serveStaticFile(res, "/video/students/memes.mp4", "video/mp4")
            break;
        default:
            serveStaticFile(res, "/error.html", "text/html", 404)
            break;
    }
}).listen(3000);

console.log('Server started on localhost:3000; press Ctrl-C to terminate....');

