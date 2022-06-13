import style from '../css/style.css';

const main = {
    up: 38,
    down: 40,
    left: 37,
    right: 39
}

if (typeof window.localStorage.getItem("key_bind") === "undefined" || window.localStorage.getItem("key_bind") === null)
    window.localStorage.setItem("key_bind", JSON.stringify(main))