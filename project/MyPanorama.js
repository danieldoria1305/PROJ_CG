import { CGFobject } from '../lib/CGF.js';
import { MySphere } from './shapes/MySphere.js';

/**
 * MyPanorama
 * @constructor
 * @param scene - Reference to MyScene object
 * @param texture - Reference to MyTexture object
 */

export class MyPanorama extends CGFobject {
    constructor(scene, texture) {
        super(scene);
        this.texture = texture;
        this.sphere = new MySphere(this.scene, 25, 25, this.texture, true);
    }

    // Display function
    display() {
        let cameraPosition = this.scene.camera.position;
        this.scene.pushMatrix();
        this.scene.translate(cameraPosition[0], cameraPosition[1], cameraPosition[2]);
        this.scene.scale(200, 200, 200);        
        this.sphere.display();
        this.scene.popMatrix(); 
    }

    enableNormalViz() {
        this.sphere.enableNormalViz();
    }

    disableNormalViz() {
        this.sphere.disableNormalViz();
    }
}