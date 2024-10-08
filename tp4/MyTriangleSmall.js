import {CGFobject} from '../lib/CGF.js';
/**
 * MyTriangle
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyTriangleSmall extends CGFobject {
    constructor(scene, textureCoords) {
        super(scene);
        this.texCoords = textureCoords;
        this.initBuffers();
    }

    initBuffers() {
        this.vertices = [
            -1, 0, 0,   //0
            1, 0, 0,    //1
            0, 1, 0,    //2
            -1, 0, 0,   //0.2
            1, 0, 0,    //1.2
            0, 1, 0     //2.2
        ];

        this.normals = [
            0, 0, 1,  //0
            0, 0, 1,  //1
            0, 0, 1,  //2
            0, 0, -1, //0.2
            0, 0, -1, //1.2
            0, 0, -1  //2.2
        ];

        this.indices = [
            0, 1, 2,
            2, 1, 0
        ];

        //The defined indices (and corresponding vertices)
		//will be read in groups of three to draw triangles
        this.primitiveType = this.scene.gl.TRIANGLES;

		this.initGLBuffers();   
    }
}