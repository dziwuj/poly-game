import express from 'express'
import path, { dirname } from 'path';
import bodyParser from 'body-parser';
import { fileURLToPath } from 'url';
import * as socket from 'socket.io'
import session from 'express-session'
import { constants } from 'buffer';
import Datastore from 'nedb'

let data_base = new Datastore({
    filename: 'scores.db',
    autoload: true
});

const app = express()
const PORT = process.env.PORT || 8080;
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const store = new session.MemoryStore();

app.use(express.urlencoded({ extended: true }));
app.use(express.static('dist'))

let sessionMiddleware = session({
    secret: 'some secrect',
    resave: false,
    cookie: {
        // path: '/',
        maxAge: 1000 * 60 * 60 * 24,  //24h
        secure: false
    },
    saveUninitialized: true,
    store
})

const server = app.listen(PORT, function () {
    console.log("Server started at port " + PORT)
})

const io1 = new socket.Server(server, {
    path: "/rooms2"
})

const io2 = new socket.Server(server, {
    path: "/lobby2"
})

const io3 = new socket.Server(server, {
    path: "/game2"
})

const io4 = new socket.Server(server, {
    path: "/scoreboard2"
})

io1.use(function (socket, next) {
    sessionMiddleware(socket.request, socket.request.res || {}, next);
});

io2.use(function (socket, next) {
    sessionMiddleware(socket.request, socket.request.res || {}, next);
});

io3.use(function (socket, next) {
    sessionMiddleware(socket.request, socket.request.res || {}, next);
});

io4.use(function (socket, next) {
    sessionMiddleware(socket.request, socket.request.res || {}, next);
});

app.use(sessionMiddleware)

app.use((req, res, next) => {
    // console.log(store);
    // console.log(`${req.method} - ${req.url}`);
    next();
})

app.get("/", function (req, res) {
    // console.log("Main: " + req.sessionID);
    res.sendFile(path.join(__dirname + "/dist/index.html"))
})

app.get("/menu", function (req, res) {
    res.sendFile(path.join(__dirname + "/dist/index.html"))
})

app.get("/settings", function (req, res) {
    res.sendFile(path.join(__dirname + "/dist/settings.html"))
    // console.log("Settings: " + req.sessionID);
    // console.log("Expires in: " + (req.session.cookie.maxAge / 1000) + "s");
})

app.get("/rules", function (req, res) {
    res.sendFile(path.join(__dirname + "/dist/rules.html"))
})

app.get("/scoreboard", function (req, res) {
    res.sendFile(path.join(__dirname + "/dist/scoreboard.html"))
})

app.get("/rooms", function (req, res) {
    res.sendFile(path.join(__dirname + "/dist/rooms.html"))
})

app.get("/lobby", function (req, res) {
    if (players.filter(el => el.id == req.sessionID).length != 0 && rooms.length != 0)
        res.sendFile(path.join(__dirname + "/dist/lobby.html"))
    else
        res.redirect("/")
})

app.get("/game", function (req, res) {
    if (players.filter(el => el.id == req.sessionID).length != 0)
        res.sendFile(path.join(__dirname + "/dist/game.html"))
    else
        res.redirect("/")
    // console.log("Game: " + req.sessionID);
})

app.get("/js/game.js", function (req, res) {
    res.sendFile(path.join(__dirname + "/dist/js/game.js"))
})

// app.get("/models/*", function (req, res) {
//     res.sendFile(path.join(__dirname + "/models/*"))
// })

let players = []
let rooms = []
let id = 1
let player_id = 1

io1.on("connection", socket => {

    io1.emit("build", rooms)

    socket.on("update", () => {
        io1.emit("build", rooms)
    })

    socket.on('disconnect', () => {
        if (players.length != 0) {
            let i = players.filter(el => el.id == socket.request.sessionID)[0];
            if (i.room == -1) {
                console.log(i.username + ' disconnected!');
                players = players.filter(el => el.id != socket.request.sessionID);
            }
        }

    });

    socket.on('isAlready', () => {
        let temp = false
        if (players.filter(el => el.id == socket.request.sessionID).length != 0)
            temp = true

        socket.emit("info", temp)
    })

    // socket.on('getRooms', () => {
    //     socket.emit("roomList", rooms)
    // })

    socket.on('join', (username) => {
        // console.log(username + " joined!");
        // console.log(socket.id + " - socket id!");
        // console.log(socket.request.sessionID + " - session id!");
        const user = {
            username: username,
            id: socket.request.sessionID,
            room: -1,
            lp: player_id
        }
        // console.log("player " + player_id + ": ", user);
        player_id++
        players.push(user)
        // console.log(players);
    })

    socket.on('createRoom', (roomName) => {
        const room = {
            id: id,
            name: roomName,
            owner: players.filter(el => el.id == socket.request.sessionID)[0].username,
            p1: socket.request.sessionID,
            p2: "",
            p2_nick: "",
            stage: -1,
            started: false,
            interval: ""
        }
        rooms.push(room)
        // console.log(rooms);
        const gamer = players.filter(el => el.id == socket.request.sessionID)[0]
        gamer.room = id
        id++
        console.log("create Room");
        socket.emit('redirect', '/lobby');
        io1.emit("build", rooms)
    })

    socket.on('joinRoom', (room) => {

        let cur = rooms.findIndex(el => el.p1 == room.p1)
        const gamer = players.filter(el => el.id == socket.request.sessionID)[0]
        rooms[cur].p2 = socket.request.sessionID
        rooms[cur].p2_nick = gamer.username
        gamer.room = rooms[cur].id
        // console.log("Pokoje: ", rooms);
        socket.emit('redirect', '/lobby');
        console.log("join Room")
    })


});

io2.on("connection", socket => {

    let started = false

    players.forEach(el => {
        if (el.id == socket.request.sessionID)
            socket.join("room-" + el.room)
    });

    const lobby = rooms.filter(el => (el.p1 == socket.request.sessionID) || (el.p2 == socket.request.sessionID))[0]
    let room = []
    const p1 = players.filter(el => el.id == lobby.p1)[0]
    room.push(p1)
    // console.log(p1);

    if (lobby.p2 != "") {
        const p2 = players.filter(el => el.id == lobby.p2)[0]
        room.push(p2)
        // console.log(p2);
    }

    const player = players.filter(el => el.id == socket.request.sessionID)[0];

    io2.in("room-" + player.room).emit("build", room)

    socket.on("update", () => {
        io2.in("room-" + player.room).emit("build", room)
    })

    socket.on('startGame', () => {
        io2.in("room-" + player.room).emit("redirect", "/game")
    })

    socket.on('disconnect', () => {
        if (started) {
            socket.in("room-" + player.room).emit("redirect", "/game")
        }
        // socket.to(player.room).emit("redirect", "/")
        // rooms = rooms.filter(el => el.id != player.room)
    });

    // socket.on('getPlayers', () => {
    //     // const lobby = rooms.filter(el => (el.p1 == socket.request.sessionID) || (el.p2 == socket.request.sessionID))[0]
    //     // let room = []
    //     // const p1 = players.filter(el => el.id == lobby.p1)[0]
    //     // room.push(p1)
    //     // // console.log(p1);

    //     // if (lobby.p2 != "") {
    //     //     const p2 = players.filter(el => el.id == lobby.p2)[0]
    //     //     room.push(p2)
    //     //     // console.log(p2);
    //     // }

    //     socket.emit("playerList", room, socket.request.sessionID)
    // })
})

// let count = 0

io3.on("connection", socket => {

    players.forEach(el => {
        if (el.id == socket.request.sessionID)
            socket.join("room-" + el.room)
    });

    const player = players.filter(el => el.id == socket.request.sessionID)[0];

    let room = rooms.filter(el => el.id == player.room)[0]

    // count = io3.sockets.adapter.rooms.get('room-' + player.room).size

    if (room.stage == -1) {
        let stage = Math.floor(Math.random() * 2) //2 = Levels.length
        room.stage = stage
        io3.in("room-" + player.room).emit("generate", stage, player.id, room)
    } else {
        socket.emit("generate", room.stage, player.id, room)
    }

    socket.on("began", () => {
        room.started = true
    })

    socket.on("time_start", () => {
        let sec = 3 * 60
        startTimer(sec)
    })

    function startTimer(duration) {
        let start = Date.now(),
            diff,
            minutes,
            seconds;
        room.score = duration * 100
        function timer() {
            room.score -= 100
            // get the number of seconds that have elapsed since 
            // startTimer() was called
            diff = duration - (((Date.now() - start) / 1000) | 0);

            // does the same job as parseInt truncates the float
            minutes = (diff / 60) | 0;
            seconds = (diff % 60) | 0;

            minutes = minutes < 10 ? "0" + minutes : minutes;
            seconds = seconds < 10 ? "0" + seconds : seconds;

            let time = minutes + ":" + seconds;

            if (diff <= 0) {
                // add one second so that the count down starts at the full duration
                // example 05:00 not 04:59
                start = Date.now() + 1000;
            }

            io3.in("room-" + player.room).emit("time", time)
        };
        // we don't want to wait a full second before the timer starts
        timer();
        room.interval = setInterval(timer, 1000);
    }

    socket.on("camera", (camera) => {
        io3.to("room-" + player.room).emit("cam", camera)
    })

    socket.on("win", () => {
        console.log("victory");
        io3.in("room-" + player.room).emit("victory")
        socket.leave('room-' + player.room)
        clearInterval(room.interval)
        rooms = rooms.filter(el => el.id != player.room)
        data_base.insert(room, function (err, newDoc) { });
    })

    socket.on("lose", () => {
        console.log("defeat");
        io3.in("room-" + player.room).emit("defeat")
        socket.leave('room-' + player.room)
        clearInterval(room.interval)
        rooms = rooms.filter(el => el.id != player.room)
        data_base.insert(room, function (err, newDoc) { });
    })

    // socket.on("disconnect", () => {

    //     // let count = io3.sockets.adapter.rooms.get('room-' + player.room).size;
    //     // console.log("count: " + count);
    //     // if (count == 1) {
    //     //     io3.in(player.room).emit("clg", "pause")
    //     // }
    // })
})

io4.on("connection", socket => {

    data_base.find({}, function (err, docs) {
        // console.log(docs);
        io4.emit("build", docs)
    });


})