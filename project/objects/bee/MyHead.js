import { CGFobject, CGFappearance, CGFtexture } from '../../../lib/CGF.js';
import { MySphere } from '../../shapes/MySphere.js';
import { MyLeg } from './MyLeg.js';


/**
 * MyHead
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyHead extends CGFobject {
    constructor(scene) {
        super(scene);
        this.headTex = new CGFtexture(this.scene, "images/head.jpg");
        this.head = new MySphere(this.scene, 15, 15, this.headTex, false, true);

        this.antena = new MyLeg(this.scene);

        this.eyeTex = new CGFtexture(this.scene, "images/eye.jpg");
        this.eye = new MySphere(this.scene, 9, 9, this.eyeTex, false, true);
    }
    
    display() {
        // Head
        this.scene.pushMatrix();
        this.scene.translate(0, 0.65, 2.4);
        this.scene.rotate(-Math.PI / 3, 0, 0, 1);
        this.scene.scale(0.4, 0.4, 0.4);
        this.head.display();
        this.scene.popMatrix();

        // Antenas
        this.scene.pushMatrix();
        this.scene.translate(0.4, 1.1, 2.5);
        this.scene.rotate(Math.PI / 2, 0, 1, 0);
        this.scene.rotate(Math.PI / 3, 1, 0, 0);
        this.scene.scale(0.7, 0.7, 0.7);
        this.antena.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(-0.4, 1.1, 2.5);
        this.scene.rotate(Math.PI / 2, 0, 1, 0);
        this.scene.rotate(-Math.PI / 3, 1, 0, 0);
        this.scene.scale(0.7, 0.7, 0.7);
        this.antena.display();
        this.scene.popMatrix();

        // Eyes
        this.scene.pushMatrix();
        this.scene.translate(0.2, 0.65, 2.72);
        this.scene.rotate(Math.PI / 6, 0, 1, 0);
        this.scene.scale(0.1, 0.15, 0.05);
        this.eye.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(-0.2, 0.65, 2.72);
        this.scene.rotate(-Math.PI / 6, 0, 1, 0);
        this.scene.scale(0.1, 0.15, 0.05);
        this.eye.display();
        this.scene.popMatrix();
    }
}