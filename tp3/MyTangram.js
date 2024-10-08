import { CGFobject, CGFappearance } from '../lib/CGF.js';
import { MyDiamond } from "./MyDiamond.js";
import { MyTriangle } from "./MyTriangle.js";
import { MyParallelogram } from "./MyParallelogram.js";
import { MyTriangleSmall } from "./MyTriangleSmall.js";
import { MyTriangleBig } from "./MyTriangleBig.js";

/**
 * MyTangram
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyTangram extends CGFobject {
	constructor(scene) {
		super(scene);
        this.diamond = new MyDiamond(this.scene);
        this.triangle = new MyTriangle(this.scene);
        this.parallelogram = new MyParallelogram(this.scene);
		this.triangleBig = new MyTriangleBig(this.scene);
        this.triangleSmall = new MyTriangleSmall(this.scene);
        this.initMaterials();
	}

    initMaterials() {
        
        this.blue = new CGFappearance(this.scene);
        this.blue.setAmbient(0, 0, 1, 1);
        this.blue.setDiffuse(0, 0, 1, 1);
        this.blue.setSpecular(0.95, 0.95, 0.95, 1);
        this.blue.setShininess(10.0);

        this.red = new CGFappearance(this.scene);
        this.red.setAmbient(1, 0, 0, 1);
        this.red.setDiffuse(1, 0, 0, 1);
        this.red.setSpecular(0.95, 0.95, 0.95, 1);
        this.red.setShininess(10.0);

        this.purple = new CGFappearance(this.scene);
        this.purple.setAmbient(0.5, 0, 0.5, 1);
        this.purple.setDiffuse(0.5, 0, 0.5, 1);
        this.purple.setSpecular(0.95, 0.95, 0.95, 1);
        this.purple.setShininess(10.0);

        this.orange = new CGFappearance(this.scene);
        this.orange.setAmbient(1, 0.65, 0, 1);
        this.orange.setDiffuse(1, 0.65, 0, 1);
        this.orange.setSpecular(0.95, 0.95, 0.95, 1);
        this.orange.setShininess(10.0);

        this.pink = new CGFappearance(this.scene);
        this.pink.setAmbient(1, 0.71, 0.76, 1);
        this.pink.setDiffuse(1, 0.71, 0.76, 1);
        this.pink.setSpecular(0.95, 0.95, 0.95, 1);
        this.pink.setShininess(10.0);

        this.yellow = new CGFappearance(this.scene);
        this.yellow.setAmbient(1, 1, 0, 1);
        this.yellow.setDiffuse(1, 1, 0, 1);
        this.yellow.setSpecular(0.95, 0.95, 0.95, 1);
        this.yellow.setShininess(10.0);
    }

    display() {

        // Green Diamond
        this.scene.pushMatrix();     
        let translationMatrix =[
            1, 0, 0, 0,
            0, 1, 0, 0,
            0, 0, 1, 0,
            0.5, 0.5 + 2*Math.sqrt(2), 0, 1
        ];

        this.scene.multMatrix(translationMatrix);
        this.scene.customMaterial.apply();
        this.diamond.display();
        this.scene.popMatrix();

        // Blue Triangle
        this.scene.pushMatrix();
        this.scene.translate(0, 2*Math.sqrt(2) - 2, 0);
        this.blue.apply();
        this.triangleBig.display();
        this.scene.popMatrix();

        // Red Triangle
        this.scene.pushMatrix();
        this.scene.rotate(Math.PI / 2, 0, 0 ,1);
        this.scene.translate(-1, 0, 0);
        this.red.apply();
        this.triangleSmall.display();
        this.scene.popMatrix();

        // Purple Triangle
        this.scene.pushMatrix();
        this.scene.translate(-1, -2, 0);
        this.purple.apply();
        this.triangleSmall.display();
        this.scene.popMatrix();

        // Orange Triangle
        this.scene.pushMatrix();
        this.scene.rotate(Math.PI/4, 0, 0, 1);
        this.scene.translate(-2*Math.sqrt(2) + 2, 0, 0);
        this.orange.apply();
        this.triangleBig.display();
        this.scene.popMatrix();

        // Pink Triangle
        this.scene.pushMatrix();
        this.scene.rotate(Math.PI, 0, 0, 1);
        this.scene.translate(1, 3, 0);
        this.pink.apply();
        this.triangle.display();
        this.scene.popMatrix();

        // Yellow Parallelogram
        this.scene.pushMatrix();
        this.scene.scale(-1, 1, 1);
        this.scene.translate(0, -4, 0);
        this.yellow.apply();
        this.parallelogram.display();
        this.scene.popMatrix();
    }

    enableNormalViz() {
        this.diamond.enableNormalViz();
        this.triangle.enableNormalViz();
        this.parallelogram.enableNormalViz();
        this.triangleBig.enableNormalViz();
        this.triangleSmall.enableNormalViz();
    }

    disableNormalViz() {
        this.diamond.disableNormalViz();
        this.triangle.disableNormalViz();
        this.parallelogram.disableNormalViz();
        this.triangleBig.disableNormalViz();
        this.triangleSmall.disableNormalViz();
    }
}
