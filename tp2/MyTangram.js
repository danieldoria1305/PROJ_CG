import {CGFobject} from '../lib/CGF.js';
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
        this.scene.setDiffuse(0, 255/255, 0, 0);
        this.diamond.display();
        this.scene.popMatrix();

        // Blue Triangle
        this.scene.pushMatrix();
        this.scene.translate(0, 2*Math.sqrt(2) - 2, 0);
        this.scene.setDiffuse(0, 0, 255/255, 0);
        this.triangleBig.display();
        this.scene.popMatrix();

        // Red Triangle
        this.scene.pushMatrix();
        this.scene.rotate(Math.PI / 2, 0, 0 ,1);
        this.scene.translate(-1, 0, 0);
        this.scene.setDiffuse(255/255, 0, 0, 0);
        this.triangleSmall.display();
        this.scene.popMatrix();

        // Purple Triangle
        this.scene.pushMatrix();
        this.scene.translate(-1, -2, 0);
        this.scene.setDiffuse(128/255, 0, 128/255, 0);
        this.triangleSmall.display();
        this.scene.popMatrix();

        // Oragne Triangle
        this.scene.pushMatrix();
        this.scene.rotate(Math.PI/4, 0, 0, 1);
        this.scene.translate(-2*Math.sqrt(2) + 2, 0, 0);
        this.scene.setDiffuse(255/255, 165/255, 0, 0);
        this.triangleBig.display();
        this.scene.popMatrix();

        // Pink Triangle
        this.scene.pushMatrix();
        this.scene.rotate(Math.PI, 0, 0, 1);
        this.scene.translate(1, 3, 0);
        this.scene.setDiffuse(255/255, 182/255, 193/255, 0);
        this.triangle.display();
        this.scene.popMatrix();

        // Yellow Parallelogram
        this.scene.pushMatrix();
        this.scene.scale(-1, 1, 1);
        this.scene.translate(0, -4, 0);
        this.scene.setDiffuse(255/255, 255/255, 0, 0);
        this.parallelogram.display();
        this.scene.popMatrix();
    }
}
