/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/routes/settings.js":
/*!********************************!*\
  !*** ./src/routes/settings.js ***!
  \********************************/
/***/ (() => {

eval("const up = document.getElementById(\"UP\")\r\nconst down = document.getElementById(\"DOWN\")\r\nconst left = document.getElementById(\"LEFT\")\r\nconst right = document.getElementById(\"RIGHT\")\r\n\r\nconst main = {\r\n    up: 38,\r\n    down: 40,\r\n    left: 37,\r\n    right: 39\r\n}\r\n\r\nlet new_bind = {\r\n    up: 38,\r\n    down: 40,\r\n    left: 37,\r\n    right: 39\r\n}\r\n\r\nwindow.localStorage.setItem(\"key_bind\", JSON.stringify(main))\r\n\r\nup.addEventListener(\"click\", () => {\r\n    let div = document.createElement(\"div\")\r\n    div.id = \"key_inform\"\r\n    div.innerText = 'Press new \"Rotate up\" key!'\r\n    document.body.appendChild(div)\r\n    window.addEventListener(\"keydown\", get_up)\r\n\r\n})\r\nfunction get_up(e) {\r\n    new_bind.up = e.which\r\n    console.log(new_bind);\r\n    window.localStorage.removeItem(\"key_bind\")\r\n    window.localStorage.setItem(\"key_bind\", JSON.stringify(new_bind))\r\n    window.removeEventListener(\"keydown\", get_up)\r\n    document.getElementById(\"key_inform\").remove()\r\n}\r\n\r\ndown.addEventListener(\"click\", () => {\r\n    let div = document.createElement(\"div\")\r\n    div.id = \"key_inform\"\r\n    div.innerText = 'Press new \"Rotate down\" key!'\r\n    document.body.appendChild(div)\r\n    window.addEventListener(\"keydown\", get_down)\r\n\r\n})\r\nfunction get_down(e) {\r\n    new_bind.down = e.which\r\n    console.log(new_bind);\r\n    window.localStorage.removeItem(\"key_bind\")\r\n    window.localStorage.setItem(\"key_bind\", JSON.stringify(new_bind))\r\n    window.removeEventListener(\"keydown\", get_down)\r\n    document.getElementById(\"key_inform\").remove()\r\n}\r\n\r\nleft.addEventListener(\"click\", () => {\r\n    let div = document.createElement(\"div\")\r\n    div.id = \"key_inform\"\r\n    div.innerText = 'Press new \"Rotate left\" key!'\r\n    document.body.appendChild(div)\r\n    window.addEventListener(\"keydown\", get_left)\r\n\r\n})\r\nfunction get_left(e) {\r\n    new_bind.left = e.which\r\n    console.log(new_bind);\r\n    window.localStorage.removeItem(\"key_bind\")\r\n    window.localStorage.setItem(\"key_bind\", JSON.stringify(new_bind))\r\n    window.removeEventListener(\"keydown\", get_left)\r\n    document.getElementById(\"key_inform\").remove()\r\n}\r\n\r\nright.addEventListener(\"click\", () => {\r\n    let div = document.createElement(\"div\")\r\n    div.id = \"key_inform\"\r\n    div.innerText = 'Press new \"Rotate right\" key!'\r\n    document.body.appendChild(div)\r\n    window.addEventListener(\"keydown\", get_right)\r\n\r\n})\r\nfunction get_right(e) {\r\n    new_bind.right = e.which\r\n    console.log(new_bind);\r\n    window.localStorage.removeItem(\"key_bind\")\r\n    window.localStorage.setItem(\"key_bind\", JSON.stringify(new_bind))\r\n    window.removeEventListener(\"keydown\", get_right)\r\n    document.getElementById(\"key_inform\").remove()\r\n}\n\n//# sourceURL=webpack://frontend/./src/routes/settings.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/routes/settings.js"]();
/******/ 	
/******/ })()
;