import { Scene, Vector3, AmbientLight } from 'three';
import Renderer from './Renderer';
import Camera from './Camera';
import Stats from 'three/examples/jsm/libs/stats.module.js';
import { OrbitControls } from './OrbitControls'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import Levels from './Levels'
import { io } from "socket.io-client";

// import Keyboard from "./Keyboard"
// import Config from "./Config"

const socket = io.connect({ path: "/game2" })

export default class Main_sight {
    constructor(container, solution, stage) {

        console.log(stage);

        this.container = container;
        this.scene = new Scene();
        this.renderer = new Renderer(container);
        this.camera = new Camera(30, window.innerWidth / 2, window.innerHeight);
        this.camera.position.set(100, 100, 100)
        this.camera.lookAt(new Vector3(0, 0, 0));
        this.light = new AmbientLight(0xf0f0f0, 5);
        this.scene.add(this.light);

        //GLTF LOADER
        const loader = new GLTFLoader();
        loader.load(Levels[stage].model, (gltf) => {

            gltf.scene.traverse(function (child) {

                if (child.isMesh) {

                    // TOFIX RoughnessMipmapper seems to be broken with WebGL 2.0
                    // roughnessMipmapper.generateMipmaps( child.material );

                }

            });

            this.scene.add(gltf.scene);

        });

        solution.style.backgroundImage = 'url(' + Levels[stage].image + ')'

        // grid - testowa siatka na podłoże modelu

        // const gridHelper = new GridHelper(1000, 100);
        // this.scene.add(gridHelper);

        //stats - statystyki wydajności

        this.stats = new Stats();
        this.stats.showPanel(0); // 0: fps, 1: ms, 2: mb

        document.body.appendChild(this.stats.dom);

        //camera control
        // const controls = new OrbitControls(this.camera, this.renderer.domElement);



        //keyboard
        // controls.enableKeys = true;
        // controls.keys = {
        //     LEFT: 65, //left arrow
        //     UP: 38, // up arrow
        //     RIGHT: 39, // right arrow
        //     BOTTOM: 40 // down arrow
        // }

        // controls.update()

        // console.log(controls);

        // this.keyboard = new Keyboard(window);

        socket.on("victory", () => {
            this.camera.position.x = Levels[stage].pos_x
            this.camera.position.y = Levels[stage].pos_y
            this.camera.position.z = Levels[stage].pos_z
            this.camera.rotation.x = Levels[stage].rot_x
            this.camera.rotation.y = Levels[stage].rot_y
            this.camera.rotation.z = Levels[stage].rot_z
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

        socket.on("cam", (cam) => {
            this.camera.position.x = cam.pos_x
            this.camera.position.y = cam.pos_y
            this.camera.position.z = cam.pos_z
            this.camera.rotation.x = cam.rot_x
            this.camera.rotation.y = cam.rot_y
            this.camera.rotation.z = cam.rot_z
            this.camera.fov = cam.fov
        })

        this.renderer.render(this.scene, this.camera);
        requestAnimationFrame(this.render.bind(this));
    }

}

