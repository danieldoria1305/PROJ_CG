import { CGFobject, CGFtexture, CGFappearance } from '../../../lib/CGF.js';
import { MyCylinder } from '../../shapes/MyCylinder.js';
import { MyPetal } from './MyPetal.js';

/**
 * MyStem
 * @constructor
 * @param scene - Reference to MyScene object
 * @param slices - number of divisions around the Y axis
 * @param stacks - number of divisions along the Y axis
 * @param stemRadius - radius of the stem
 * @param stemHeight - height of the stem
 * @param stemColor - color of the stem
 */
export class MyStem extends CGFobject {
    constructor(scene, slices, stacks, stemRadius, stemHeight, stemColor) {
        super(scene);
        this.slices = slices;
        this.stacks = stacks;
        this.stemColor = stemColor;
        this.stemRadius = stemRadius;
        this.stemHeight = stemHeight;
        this.stemTex = new CGFtexture(scene, "images/stem.jpg");
        this.stem = new MyCylinder(this.scene, slices, stacks, this.stemTex, this.stemColor);
        
        this.petalTex = new CGFtexture(scene, "images/petal.jpg");
        this.petal = new MyPetal(this.scene, this.stemColor, this.petalTex);
        this.petalHeight = Math.random();   
        this.randomRotation = Math.random() * Math.PI;
        this.petalSize = 0.05 + Math.random() * 0.05;
        this.xTranslation = Math.sin(this.randomRotation) * -0.1;
        this.zTranslation = Math.cos(this.randomRotation) * -0.1;

        this.initBuffers();
    }
    
    display() {
        this.scene.pushMatrix();
        this.scene.scale(this.stemRadius, this.stemHeight, this.stemRadius);
        this.scene.translate(0, 0, 0);
        this.scene.rotate(- Math.PI / 2, 1, 0, 0);
        this.scene.setAmbient(...this.stemColor);
        this.scene.setDiffuse(...this.stemColor); 
        this.scene.setSpecular(...this.stemColor);
        this.scene.setShininess(10.0); 
        this.stem.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(this.xTranslation, this.petalHeight * this.stemHeight, this.zTranslation); // Translate the petal to the random height
        this.scene.rotate(this.randomRotation, 0, 1, 0);
        this.scene.scale(this.petalSize, this.petalSize, this.petalSize);
        this.petal.display();
        this.scene.popMatrix();
    }
}
