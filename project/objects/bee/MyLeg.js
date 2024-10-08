import { CGFobject, CGFappearance, CGFtexture } from "../../../lib/CGF.js";
import { MySphere } from "../../shapes/MySphere.js";

/**
 * MyLeg
 * @constructor
 * @param scene - Reference to MyScene object
 */

export class MyLeg extends CGFobject {
    constructor(scene) {
        super(scene);

        this.legTex = new CGFtexture(this.scene, "images/legs.jpg");
        this.leg = new MySphere(this.scene, 10, 10, this.legTex, false, true);
    }
    
    display() {

        this.scene.pushMatrix();
        this.scene.rotate(-Math.PI / 6, 0, 0, 1);
        this.scene.scale(0.11, 0.05, 0.05);
        this.leg.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(0.09, -0.20, 0);
        this.scene.rotate(Math.PI / 2, 0, 0, 1);
        this.scene.scale(0.15, 0.05, 0.05);
        this.leg.display();
        this.scene.popMatrix();
    }
}