import {CGFobject} from '../lib/CGF.js';
/**
 * MyUnitCube
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyUnitCube extends CGFobject {
	constructor(scene) {
		super(scene);
		this.initBuffers();
	}
	
	initBuffers() {
		this.vertices = [
			-0.5, -0.5, 0.5,	//0
            0.5, -0.5, 0.5,     //1
            0.5, 0.5, 0.5,      //2
            -0.5, 0.5, 0.5,     //3
            0.5, -0.5, -0.5,    //4
            0.5, 0.5, -0.5,     //5
            -0.5, 0.5, -0.5,    //6
            -0.5, -0.5, -0.5,   //7

		];

		//Counter-clockwise reference of vertices
		this.indices = [
			0, 1, 2,            // face da frente
			2, 3, 0,
            4, 7, 6,            // face de trás
            6, 5, 4,
            2, 5, 6,            // face de cima
            6, 3, 2,
            0, 7, 4,            // face de baixo
            4, 1, 0,
            1, 4, 5,            // face da direita
            5, 2, 1,
            0, 3, 6,            // face da esquerda
            6, 7, 0
		];

		//The defined indices (and corresponding vertices)
		//will be read in groups of three to draw triangles
		this.primitiveType = this.scene.gl.TRIANGLES;

		this.initGLBuffers();
	}
}

