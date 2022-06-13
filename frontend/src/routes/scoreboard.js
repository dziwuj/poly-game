import logo from '../assets/logo.png';
import { io } from "socket.io-client";

const socket = io.connect({ path: "/scoreboard2" })

socket.on("build", (data) => {
    console.log(data);

    data.sort((a, b) => { return b.score - a.score });

    let ul = document.getElementById("list")

    ul.innerHTML = "<li class='table-header'><div class='col col-1'>#</div><div class='col col-2'>Usernames</div><div class='col col-3'>Score</div></li>"

    let lp = 1;

    data.forEach(el => {
        let li = document.createElement("li")
        li.classList.add("table-row")

        {
            let div = document.createElement("div")
            div.classList.add("col", "col-1")
            div.innerText = lp
            li.appendChild(div)
            lp++
        }

        {
            let div = document.createElement("div")
            div.classList.add("col", "col-2")
            div.innerText = el.owner + " / " + el.p2_nick
            li.appendChild(div)
        }

        {
            let div = document.createElement("div")
            div.classList.add("col", "col-3")
            div.innerText = el.score
            li.appendChild(div)
        }
        ul.appendChild(li)

    });

})

socket.on('redirect', (destination) => {
    console.log("redirect");
    window.location.href = destination;
});

socket.on('clg', (message) => {
    console.log(message);
});