import logo from '../assets/logo.png';
import { io } from "socket.io-client";

const socket = io.connect({ path: "/lobby2" })

socket.emit("update")

socket.on("build", (room) => {
    let ul = document.getElementById("list")

    ul.innerHTML = "<li class='table-header'><div class='col col-1'>ID</div><div class='col col-2'>Username</div><div class='col col-3'>Ping</div></li>"

    room.forEach(el => {
        let li = document.createElement("li")
        li.classList.add("table-row")


        {
            let div = document.createElement("div")
            div.classList.add("col", "col-1")
            div.innerText = el.lp
            li.appendChild(div)
        }

        {
            let div = document.createElement("div")
            div.classList.add("col", "col-2")
            div.innerText = el.username
            li.appendChild(div)
        }

        {
            let div = document.createElement("div")
            div.classList.add("col", "col-3")
            div.innerText = "tu będzie ping"
            li.appendChild(div)
        }
        ul.appendChild(li)

    });

    try {
        if (room.length == 2) {
            document.getElementById("Starter").disabled = false
            document.getElementById("pre_start").onclick = () => { socket.emit("startGame") }
        } else {
            document.getElementById("Starter").disabled = true
            document.getElementById("pre_start").onclick = (e) => { e.preventDefault() }
        }
    } catch (err) {
        console.log(err);
    }

})

socket.on('redirect', (destination) => {
    console.log("redirect");
    window.location.href = destination;
});

socket.on('clg', (message) => {
    console.log(message);
});