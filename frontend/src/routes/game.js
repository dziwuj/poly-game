import Main_control from '../components/Main-control';
import Main_sight from '../components/Main-sight'
import arrow_up from '../assets/up.svg'
import arrow_left from '../assets/left.svg'
import arrow_down from '../assets/down.svg'
import arrow_right from '../assets/right.svg'
import arrow_up_active from '../assets/up_active.svg'
import arrow_left_active from '../assets/left_active.svg'
import arrow_down_active from '../assets/down_active.svg'
import arrow_right_active from '../assets/right_active.svg'
import style from '../css/style.css';
import { io } from "socket.io-client";
import { MapControls } from '../components/OrbitControls';

console.log("Łączemie - soket");

const socket = io.connect({ path: "/game2" })

let key_bind = window.localStorage.getItem("key_bind")
key_bind = JSON.parse(key_bind)
console.log(key_bind);

function init(stage, who, key_bind, started) {
    //div
    const container = document.getElementById('root');
    const solution = document.getElementById('solution');
    const timer = document.getElementById('timer');
    container.innerHTML = ""

    console.log(who);

    //main class
    if (who) {
        new Main_control(container, stage, key_bind)
    }
    else {
        new Main_sight(container, solution, stage)
        document.getElementById("controls").style.display = "none"
    }

    if (!started) {
        socket.emit("time_start")
        socket.emit("began")
    }
}

socket.on("generate", (stage, player_id, room) => {
    const who = (room.p1 == player_id)
    init(stage, who, key_bind, room.started);
})

socket.on("time", (time) => {
    timer.innerText = ""
    timer.innerText = time
    if (time == "00:00") {
        socket.emit("lose")
    }
})

socket.on("defeat", () => {
    alert("Time's up!")
    setTimeout(() => {
        window.location.href = "/"
    }, 300);
})

socket.on('clg', (message) => {
    console.log(message);
});

let up = document.getElementById("up")
let down = document.getElementById("down")
let left = document.getElementById("left")
let right = document.getElementById("right")

document.onkeydown = checkKey;
document.onkeyup = checkKey2;

function checkKey(e) {

    e = e || window.event;

    if (e.keyCode == key_bind.up) {
        //arrow up
        up.src = arrow_up_active
    }
    else if (e.keyCode == key_bind.down) {
        // down arrow
        down.src = arrow_down_active
    }
    else if (e.keyCode == key_bind.left) {
        // left arrow
        left.src = arrow_left_active
    }
    else if (e.keyCode == key_bind.right) {
        // right arrow
        right.src = arrow_right_active
    }

}

function checkKey2(e) {

    e = e || window.event;

    if (e.keyCode == key_bind.up) {
        // up arrow
        up.src = arrow_up
    }
    else if (e.keyCode == key_bind.down) {
        // down arrow
        down.src = arrow_down
    }
    else if (e.keyCode == key_bind.left) {
        // left arrow
        left.src = arrow_left
    }
    else if (e.keyCode == key_bind.right) {
        // right arrow
        right.src = arrow_right
    }

}

const root = document.getElementById('root');

up.addEventListener('mousedown', function () {
    root.focus()
    key_hack(38)
});

up.addEventListener('mouseup', function () {
    root.focus()
    key_hack2(38)
});

up.addEventListener('mouseout', function () {
    root.focus()
    key_hack2(38)
});

down.addEventListener('mousedown', function () {
    root.focus()
    key_hack(40)
});

down.addEventListener('mouseup', function () {
    root.focus()
    key_hack2(40)
});

down.addEventListener('mouseout', function () {
    root.focus()
    key_hack2(40)
});

left.addEventListener('mousedown', function () {
    root.focus()
    key_hack(37)
});

left.addEventListener('mouseup', function () {
    root.focus()
    key_hack2(37)
});

left.addEventListener('mouseout', function () {
    root.focus()
    key_hack2(37)
});

right.addEventListener('mousedown', function () {
    root.focus()
    key_hack(39)
});

right.addEventListener('mouseup', function () {
    root.focus()
    key_hack2(39)
});

right.addEventListener('mouseout', function () {
    root.focus()
    key_hack2(39)
});

function key_hack(key) {
    //var evt = document.createEvent("KeyboardEvent");
    let evt = new KeyboardEvent("keydown", {
        shiftKey: false,
        keyCode: key
    });
    document.dispatchEvent(evt);
}

function key_hack2(key) {
    //var evt = document.createEvent("KeyboardEvent");
    let evt = new KeyboardEvent("keyup", {
        shiftKey: false,
        keyCode: key
    });
    document.dispatchEvent(evt);
}

// function key_hack(key) {
//     let Podium = {};
//     Podium.keydown = function (k) {
//         var oEvent = document.createEvent("KeyboardEvent");

//         // Chromium Hack
//         Object.defineProperty(oEvent, "keyCode", {
//             get: function () {
//                 return this.keyCodeVal;
//             }
//         });
//         Object.defineProperty(oEvent, "which", {
//             get: function () {
//                 return this.keyCodeVal;
//             }
//         });

//         if (oEvent.initKeyboardEvent) {
//             oEvent.initKeyboardEvent(
//                 "keydown",
//                 true,
//                 true,
//                 document.defaultView,
//                 false,
//                 false,
//                 false,
//                 false,
//                 k,
//                 k
//             );
//         } else {
//             oEvent.initKeyEvent(
//                 "keydown",
//                 true,
//                 true,
//                 document.defaultView,
//                 false,
//                 false,
//                 false,
//                 false,
//                 k,
//                 0
//             );
//         }

//         oEvent.keyCodeVal = k;

//         if (oEvent.keyCode !== k) {
//             alert(
//                 "keyCode mismatch " + oEvent.keyCode + "(" + oEvent.which + ")"
//             );
//         }

//         document.dispatchEvent(oEvent);
//     };

//     Podium.keydown(key);
// }

// function key_hack2(key) {
//     let Podium = {};
//     Podium.keyup = function (k) {
//         var oEvent = document.createEvent("KeyboardEvent");

//         // Chromium Hack
//         Object.defineProperty(oEvent, "keyCode", {
//             get: function () {
//                 return this.keyCodeVal;
//             }
//         });
//         Object.defineProperty(oEvent, "which", {
//             get: function () {
//                 return this.keyCodeVal;
//             }
//         });

//         if (oEvent.initKeyboardEvent) {
//             oEvent.initKeyboardEvent(
//                 "keyup",
//                 true,
//                 true,
//                 document.defaultView,
//                 false,
//                 false,
//                 false,
//                 false,
//                 k,
//                 k
//             );
//         } else {
//             oEvent.initKeyEvent(
//                 "keyup",
//                 true,
//                 true,
//                 document.defaultView,
//                 false,
//                 false,
//                 false,
//                 false,
//                 k,
//                 0
//             );
//         }

//         oEvent.keyCodeVal = k;

//         if (oEvent.keyCode !== k) {
//             alert(
//                 "keyCode mismatch " + oEvent.keyCode + "(" + oEvent.which + ")"
//             );
//         }

//         document.dispatchEvent(oEvent);
//     };

//     Podium.keyup(key);
// }