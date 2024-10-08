import { CGFobject, CGFappearance, CGFtexture } from '../../../lib/CGF.js';
import { MySphere } from '../../shapes/MySphere.js';
import { MyCone } from '../../shapes/MyCone.js';

/**
 * MyReceptacle
 * @constructor
 * @param scene - Reference to MyScene object
 * @param coneColor - Color of the cone
 * @param receptacleColor - Color of the receptacle
 * @param textureSphere - Texture of the sphere
 * @param textureCone - Texture of the cone
 */
export class MyReceptacle extends CGFobject {
    constructor(scene, coneColor, receptacleColor, textureSphere, textureCone) {
        super(scene);
        this.textureSpehre = textureSphere;
        this.textureCone = textureCone;
        this.coneColor = coneColor;
        this.receptacleColor = receptacleColor;
        this.cone = new MyCone(this.scene, 20, 20, [0, 1, 0, 1], textureCone);
        this.receptacle = new MySphere(this.scene, 20, 20, textureSphere, false, true);
    }
    
    display() {
        this.scene.pushMatrix();
        this.scene.translate(0, 0.62, 0);
        this.scene.scale(0.175, -0.175, 0.175);
        this.scene.setAmbient(...this.coneColor);
        this.scene.setDiffuse(...this.coneColor); 
        this.scene.setSpecular(...this.coneColor);
        this.scene.setShininess(10.0);
        this.cone.display();
        this.scene.popMatrix();

        // create an oval to place on top of the cone
        this.scene.pushMatrix();
        this.scene.translate(0, 0.62, 0);
        this.scene.scale(0.175, 0.075, 0.175);
        this.scene.setAmbient(...this.receptacleColor);
        this.scene.setDiffuse(...this.receptacleColor); 
        this.scene.setSpecular(...this.receptacleColor);
        this.scene.setShininess(10.0);
        this.receptacle.display();
        this.scene.popMatrix();
    }
}