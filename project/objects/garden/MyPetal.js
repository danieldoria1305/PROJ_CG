
import { CGFobject, CGFappearance, CGFtexture } from '../../../lib/CGF.js';
import { MyTriangle } from '../../shapes/MyTriangle.js';

/**
 * MyPetal
 * @constructor
 * @param scene - Reference to MyScene object
 * @param petalColor - Color of the petal
 * @param texture - Texture
 */
export class MyPetal extends CGFobject {
    constructor(scene, petalColor, texture) {
        super(scene);
        this.petalColor = petalColor;
        this.texture = texture;
        this.firstpetal = new MyTriangle(this.scene, this.petalColor, this.texture);
        this.secondpetal = new MyTriangle(this.scene, this.petalColor, this.texture);
        this.initBuffers();
    }

    // Display the petal
    display() {
        this.scene.pushMatrix();
        this.scene.setDiffuse(this.petalColor[0], this.petalColor[1], this.petalColor[2], this.petalColor[3]);

        this.scene.pushMatrix();
        this.scene.rotate(Math.PI / 8, 1, 0, 0);
        this.firstpetal.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.rotate(-Math.PI, 1, 0, 0);
        this.scene.rotate(Math.PI, 0, 0, 1);
        this.secondpetal.display();
        this.scene.popMatrix();

        this.scene.popMatrix();
    }
}

