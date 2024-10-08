import { CGFobject, CGFappearance, CGFtexture } from '../../../lib/CGF.js';
import { MySphere } from '../../shapes/MySphere.js';
import { MyLeg } from './MyLeg.js';

/**
 * MyBody
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyBody extends CGFobject {
    constructor(scene) {
        super(scene);

        this.bodyTex = new CGFtexture(this.scene, "images/body.jpg");
        this.backBody = new MySphere(this.scene, 15, 15, this.bodyTex, false, true);

        this.frontBody = new MySphere(this.scene, 15, 15, this.bodyTex, false, true);

        this.leg = new MyLeg(this.scene);
    }
    
    display() {

        // Back Body
        this.scene.pushMatrix();
        this.scene.rotate(Math.PI / 3, 1, 0, 0);
        this.scene.scale(0.5, 1, 0.5);
        this.backBody.display();
        this.scene.popMatrix();

        // Front Body
        this.scene.pushMatrix();
        this.scene.translate(0, 0.5, 1.4);
        this.scene.rotate(-Math.PI / 2, 1, 0, 0);
        this.scene.scale(0.5, 0.7, 0.5);
        this.frontBody.display();
        this.scene.popMatrix();

        //// Back Legs
        this.scene.pushMatrix();
        this.scene.translate(0.5, 0.2, 0.5);
        this.scene.scale(2, 2, 2);
        this.leg.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(-0.5, 0.2, 0.5);
        this.scene.rotate(Math.PI, 0, 1, 0);
        this.scene.scale(2, 2, 2);
        this.leg.display();
        this.scene.popMatrix();

        // Middle Legs
        this.scene.pushMatrix();
        this.scene.translate(0.5, 0.4, 1.1);
        this.scene.scale(2, 2, 2);
        this.leg.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(-0.5, 0.4, 1.1);
        this.scene.rotate(Math.PI, 0, 1, 0);
        this.scene.scale(2, 2, 2);
        this.leg.display();
        this.scene.popMatrix();

        // Front Legs
        this.scene.pushMatrix();
        this.scene.translate(0.5, 0.4, 1.6);
        this.scene.scale(2, 2, 2);
        this.leg.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(-0.5, 0.4, 1.6);
        this.scene.rotate(Math.PI, 0, 1, 0);
        this.scene.scale(2, 2, 2);
        this.leg.display();
        this.scene.popMatrix();
    }
}    

