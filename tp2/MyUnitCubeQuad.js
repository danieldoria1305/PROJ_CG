import {CGFobject} from '../lib/CGF.js';
import { MyQuad } from './MyQuad.js';
/**
 * MyUnitCubeQuad
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyUnitCubeQuad extends CGFobject {
	constructor(scene) {
		super(scene);
		this.myQuad = new MyQuad(this.scene);
	}

    display() {
        // Esquerda
        this.scene.pushMatrix();
        this.scene.translate(0, 0, 0.5);
        this.myQuad.display();
        this.scene.popMatrix();

        // Direita
        this.scene.pushMatrix();
        this.scene.translate(0, 0, -0.5);
        this.scene.rotate(Math.PI, 1, 0, 0);
        this.myQuad.display();
        this.scene.popMatrix();

        // Frente
        this.scene.pushMatrix();
        this.scene.translate(0.5, 0, 0);
        this.scene.rotate(Math.PI / 2, 0, 1, 0);
        this.myQuad.display();
        this.scene.popMatrix();

        // Trás
        this.scene.pushMatrix();
        this.scene.translate(-0.5, 0, 0);
        this.scene.rotate(3 * Math.PI / 2, 0, 1, 0);
        this.myQuad.display();
        this.scene.popMatrix();

        // Topo
        this.scene.pushMatrix();
        this.scene.translate(0, 0.5, 0);
        this.scene.rotate(3 * Math.PI/2 , 1, 0, 0);
        this.myQuad.display();
        this.scene.popMatrix();

        // Baixo
        this.scene.pushMatrix();
        this.scene.translate(0, -0.5, 0);
        this.scene.rotate(Math.PI/2 , 1, 0, 0);
        this.myQuad.display();
        this.scene.popMatrix();

    }

}

