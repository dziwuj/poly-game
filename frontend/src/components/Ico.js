import {
    IcosahedronGeometry,
    MeshNormalMaterial,
    Mesh,
    DoubleSide,
} from "three";

export default class Ico extends Mesh {

    constructor(size) {
        super(new IcosahedronGeometry(size), new MeshNormalMaterial({ side: DoubleSide }))
    }
    // obrót
    // update() {
    //     this.rotation.y += 0.01
    // }

}

