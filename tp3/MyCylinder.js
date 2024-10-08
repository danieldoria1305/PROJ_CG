import { CGFobject } from '../lib/CGF.js';
/**
 * MyCylinder
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyCylinder extends CGFobject {
    constructor(scene, slices, stacks) 
	{
        super(scene);
        this.slices = slices;
        this.stacks = stacks;
        this.initBuffers();
    }

    initBuffers() {
        this.vertices = [];
        this.indices = [];
        this.normals = [];

        let index = 0;
        let angleIncrement = 2 * Math.PI / this.slices;
        let stackIncrement = 1 / this.stacks;
        let z = 0;


        for (let i = 0 ; i < this.slices ; i++) {
            let x1 = Math.cos(i * angleIncrement);
            let y1 = Math.sin(i * angleIncrement);
            let x2 = Math.cos((i + 1) * angleIncrement);
            let y2 = Math.sin((i + 1) * angleIncrement);
       
            for (let j = 0 ; j < this.stacks ; j++) {

                z = stackIncrement * j;

                this.vertices.push(x1, y1, z, x2, y2, z, x1, y1, stackIncrement + z, x2, y2, stackIncrement + z);
                this.indices.push(index + 2, index, index + 1, index + 1, index + 3, index + 2);
                this.normals.push(x1, y1, z, x2, y2, z, x1, y1, z, x2, y2, z);

                index += 4;
            }
        }

        this.primitiveType = this.scene.gl.TRIANGLES;
        this.initGLBuffers();
    }
}