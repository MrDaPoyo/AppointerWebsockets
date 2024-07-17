let express = require('express');
let http = require('http').createServer(app);
let io = require('socket.io')(http);
let port = process.env.PORT || 3000;

let app = express();

app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
    res.render('/index.html');
});

io.on('connection', (socket) => {
    console.log('A user connected');

    socket.on('message', (message) => {
        console.log(`Received message: ${message}`);
        socket.broadcast.emit('message', message);
    });

    socket.on('disconnect', () => {
        console.log('A user disconnected');
    });
});

http.listen(8080, () => {
    console.log('Video call server is running');
});