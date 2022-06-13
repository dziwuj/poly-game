import { io } from "socket.io-client";

const socket = io.connect({ path: "/rooms2" })

socket.emit('isAlready');

socket.emit("update")

socket.on("build", (rooms) => {
    console.log(rooms);


    let ul = document.getElementById("list")

    ul.innerHTML = '<li class="table-header"><div class="col col-1">Room ID</div><div class="col col-2">Room name</div><div class="col col-3">Owner</div></li>'

    rooms.forEach(el => {
        let li = document.createElement("li")
        li.classList.add("table-row")

        let a = document.createElement("a")
        let cont = document.createElement("div")
        if (el.p2 == "") {
            li.classList.add("join")
            a.onclick = () => { JoinRoom(el) }
        }
        else
            li.classList.add("full")
        // a.href = "game"


        {
            let div = document.createElement("div")
            div.classList.add("col", "col-1")
            div.innerText = el.id
            li.appendChild(div)
        }
        {
            let div = document.createElement("div")
            div.classList.add("col", "col-2")
            div.innerText = el.name
            li.appendChild(div)
        }
        {
            let div = document.createElement("div")
            div.classList.add("col", "col-3")
            div.innerText = el.owner
            li.appendChild(div)
        }
        a.appendChild(li)
        a.appendChild(cont)
        ul.appendChild(a)
    });
})

{/* <li class="table-row">
                <div class="col col-1">42235</div>
                <div class="col col-2">John Doe</div>
                <div class="col col-3">
                    <button>Join</button>
                </div>
            </li> */}

window.addEventListener("load", function () {
    socket.on("info", (temp) => {
        if (!temp) {
            setTimeout(() => {
                function starter() {
                    let who = prompt("Who are you?")
                    if (who) {
                        socket.emit('join', who);
                    }
                    else
                        starter()
                }
                starter()
            }, 500);
        }
    })
});

const newRoom = document.getElementById("newRoom")

newRoom.addEventListener("click", function () {
    let roomName = prompt("Give me your room name")
    if (roomName)
        socket.emit('createRoom', roomName)
})

socket.on('redirect', (destination) => {
    console.log("redirect");
    window.location.href = destination;
});

function JoinRoom(el) {
    console.log("Joining");
    console.log(el.id);
    socket.emit("joinRoom", el)
}