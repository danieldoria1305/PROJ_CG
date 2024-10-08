import {CGFobject} from '../lib/CGF.js';
/**
 * MyParallelogram
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyParallelogram extends CGFobject {
    constructor(scene) {
        super(scene);
        this.initBuffers();
    }

    initBuffers() {
        this.vertices = [
            0, 0, 0,  // 0
            1, 0, 0,  // 1
            1, 1, 0,  // 2
            2, 0, 0,  // 3
            2, 1, 0,  // 4
            3, 1, 0,  // 5
            0, 0, 0,  // 0.2
            1, 0, 0,  // 1.2
            1, 1, 0,  // 2.2
            2, 0, 0,  // 3.2
            2, 1, 0,  // 4.2
            3, 1, 0   // 5.2
        ];

        this.normals = [
            0, 0, 1,  // 0
            0, 0, 1,  // 1
            0, 0, 1,  // 2
            0, 0, 1,  // 3
            0, 0, 1,  // 4
            0, 0, 1,  // 5
            0, 0, -1, // 0.2
            0, 0, -1, // 1.2
            0, 0, -1, // 2.2
            0, 0, -1, // 3.2
            0, 0, -1, // 4.2
            0, 0, -1  // 5.2
        ];

        this.indices = [
            0, 1, 2,  // front side
            1, 3, 4,
            4, 2, 1,
            5, 4, 3,
            2, 1, 0,  // back side
            4, 3, 1,
            1, 2, 4,
            3, 4, 5
        ]; 

        //The defined indices (and corresponding vertices)
		//will be read in groups of three to draw triangles
        this.primitiveType = this.scene.gl.TRIANGLES;

		this.initGLBuffers();   
    }
}