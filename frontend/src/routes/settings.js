const up = document.getElementById("UP")
const down = document.getElementById("DOWN")
const left = document.getElementById("LEFT")
const right = document.getElementById("RIGHT")

const main = {
    up: 38,
    down: 40,
    left: 37,
    right: 39
}

let new_bind = {
    up: 38,
    down: 40,
    left: 37,
    right: 39
}

window.localStorage.setItem("key_bind", JSON.stringify(main))

up.addEventListener("click", () => {
    let div = document.createElement("div")
    div.id = "key_inform"
    div.innerText = 'Press new "Rotate up" key!'
    document.body.appendChild(div)
    window.addEventListener("keydown", get_up)

})
function get_up(e) {
    new_bind.up = e.which
    console.log(new_bind);
    window.localStorage.removeItem("key_bind")
    window.localStorage.setItem("key_bind", JSON.stringify(new_bind))
    window.removeEventListener("keydown", get_up)
    document.getElementById("key_inform").remove()
}

down.addEventListener("click", () => {
    let div = document.createElement("div")
    div.id = "key_inform"
    div.innerText = 'Press new "Rotate down" key!'
    document.body.appendChild(div)
    window.addEventListener("keydown", get_down)

})
function get_down(e) {
    new_bind.down = e.which
    console.log(new_bind);
    window.localStorage.removeItem("key_bind")
    window.localStorage.setItem("key_bind", JSON.stringify(new_bind))
    window.removeEventListener("keydown", get_down)
    document.getElementById("key_inform").remove()
}

left.addEventListener("click", () => {
    let div = document.createElement("div")
    div.id = "key_inform"
    div.innerText = 'Press new "Rotate left" key!'
    document.body.appendChild(div)
    window.addEventListener("keydown", get_left)

})
function get_left(e) {
    new_bind.left = e.which
    console.log(new_bind);
    window.localStorage.removeItem("key_bind")
    window.localStorage.setItem("key_bind", JSON.stringify(new_bind))
    window.removeEventListener("keydown", get_left)
    document.getElementById("key_inform").remove()
}

right.addEventListener("click", () => {
    let div = document.createElement("div")
    div.id = "key_inform"
    div.innerText = 'Press new "Rotate right" key!'
    document.body.appendChild(div)
    window.addEventListener("keydown", get_right)

})
function get_right(e) {
    new_bind.right = e.which
    console.log(new_bind);
    window.localStorage.removeItem("key_bind")
    window.localStorage.setItem("key_bind", JSON.stringify(new_bind))
    window.removeEventListener("keydown", get_right)
    document.getElementById("key_inform").remove()
}