import { Scene, Vector3, AmbientLight } from 'three';
import Renderer from './Renderer';
import Camera from './Camera';
import Stats from 'three/examples/jsm/libs/stats.module.js';
import { OrbitControls } from './OrbitControls'
import Ico from './Ico'
import Levels from './Levels'
import { io } from "socket.io-client";

// import Keyboard from "./Keyboard"
// import Config from "./Config"

const socket = io.connect({ path: "/game2" })

export default class Main_control {
    constructor(container, stage, key_bind) {

        console.log(stage);

        this.stage = stage

        this.container = container;
        this.scene = new Scene();
        this.renderer = new Renderer(container);
        this.camera = new Camera(30, window.innerWidth / 2, window.innerHeight);
        this.camera.position.set(100, 100, 100)
        this.camera.lookAt(new Vector3(0, 0, 0));
        this.light = new AmbientLight(0xf0f0f0, 5);
        this.scene.add(this.light);

        this.ico = new Ico(25)
        this.scene.add(this.ico)

        // solution.style.backgroundImage = 'url(' + Levels[stage].image + ')'

        // grid - testowa siatka na podłoże modelu

        // const gridHelper = new GridHelper(1000, 100);
        // this.scene.add(gridHelper);

        //stats - statystyki wydajności

        this.stats = new Stats();
        this.stats.showPanel(0); // 0: fps, 1: ms, 2: mb

        document.body.appendChild(this.stats.dom);

        //camera control
        const controls = new OrbitControls(this.camera, this.renderer.domElement);

        //keyboard
        // controls.enableKeys = true;
        controls.keys = {
            LEFT: key_bind.left, // A
            UP: key_bind.up, // W
            RIGHT: key_bind.right, // D
            BOTTOM: key_bind.down // S
        }

        controls.update()

        console.log(controls);

        // {
        //     let button = document.createElement("button")
        //     button.innerText = "print"
        //     button.onclick = () => {
        //         console.table({
        //             pos_x: this.camera.position.x,
        //             pos_y: this.camera.position.y,
        //             pos_z: this.camera.position.z,
        //             rot_x: this.camera.rotation.x,
        //             rot_y: this.camera.rotation.y,
        //             rot_z: this.camera.rotation.z,
        //         });
        //     }
        //     solution.appendChild(button)
        // }

        // {
        //     let button = document.createElement("button")
        //     button.innerText = "conditions"
        //     button.onclick = () => {
        //         console.table({
        //             p_x: this.is_pos_x,
        //             p_y: this.is_pos_y,
        //             p_z: this.is_pos_z,
        //             r_x: this.is_rot_x,
        //             r_y: this.is_rot_y,
        //             r_z: this.is_rot_z,
        //         });
        //     }
        //     solution.appendChild(button)
        // }

        // this.keyboard = new Keyboard(window);

        this.sent = false

        socket.on("victory", () => {
            setTimeout(() => {
                alert("You have won!")
                setTimeout(() => {
                    window.location.href = "/"
                }, 300);
            }, 2000);
        })

        // render
        this.render();

    }

    render() {

        // początek pomiaru wydajności
        this.stats.begin()

        // obsługa ruch modelu dopiero kiedy jest załadowany, można tą część umieścić w module Keyboard
        // tworząc w nim np funkcję update() i wywoływać ją poniżej

        //
        // if (Config.rotateLeft) {
        //     this.player.rotation.y += 0.03
        // }
        // if (Config.rotateRight) {
        //     this.player.rotation.y -= 0.03
        // }
        // if (Config.moveForward) {
        //     this.player.translateZ(1)
        // }

        // koniec statystyk
        this.stats.end()

        this.renderer.setViewport(0, 0, innerWidth / 2, innerHeight)

        socket.emit('camera', {
            pos_x: this.camera.position.x,
            pos_y: this.camera.position.y,
            pos_z: this.camera.position.z,
            rot_x: this.camera.rotation.x,
            rot_y: this.camera.rotation.y,
            rot_z: this.camera.rotation.z,
            fov: this.camera.fov
        });

        this.is_pos_x = (Math.abs(Levels[this.stage].pos_x - this.camera.position.x) < 20)
        this.is_pos_y = (Math.abs(Levels[this.stage].pos_y - this.camera.position.y) < 20)
        this.is_pos_z = (Math.abs(Levels[this.stage].pos_z - this.camera.position.z) < 20)
        this.is_rot_x = (Math.abs(Levels[this.stage].rot_x - this.camera.rotation.x) < 0.1)
        this.is_rot_y = (Math.abs(Levels[this.stage].rot_y - this.camera.rotation.y) < 0.1)
        this.is_rot_z = (Math.abs(Levels[this.stage].rot_z - this.camera.rotation.z) < 0.1)

        if (this.is_pos_x && this.is_pos_y && this.is_pos_z && this.is_rot_x && this.is_rot_y && this.is_rot_z && !this.sent) {
            socket.emit("win")
            this.sent = true
        }



        this.renderer.render(this.scene, this.camera);
        requestAnimationFrame(this.render.bind(this));
    }


}

