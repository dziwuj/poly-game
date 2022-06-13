import { WebGLRenderer } from 'three';
import * as THREE from 'three/build/three.module.js';

export default class Renderer extends WebGLRenderer {
    constructor(container) {
        super({ antialias: true })

        this.container = container

        this.container.appendChild(this.domElement);

        // resize
        this.updateSize();
        document.addEventListener('DOMContentLoaded', () => this.updateSize(), false);
        window.addEventListener('resize', () => this.updateSize(), false);

        this.setPixelRatio(window.devicePixelRatio);
        this.setSize(window.innerWidth, window.innerHeight);
        this.setViewport(0, 0, innerWidth / 2, innerHeight)
        this.toneMapping = THREE.ACESFilmicToneMapping;
        this.toneMappingExposure = 1;
        this.outputEncoding = THREE.sRGBEncoding;
        container.appendChild(this.domElement);

        this.pmremGenerator = new THREE.PMREMGenerator(this);
        this.pmremGenerator.compileEquirectangularShader();
    }

    updateSize() {
        this.setSize(window.innerWidth, window.innerHeight);
    }

}
