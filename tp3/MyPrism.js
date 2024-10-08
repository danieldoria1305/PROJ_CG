import { CGFobject } from '../lib/CGF.js';
/**
 * MyPrism
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyPrism extends CGFobject {
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
        
        for (let i = 0 ; i < this.slices ; i++) {
            let x1 = Math.cos(i * angleIncrement);
            let y1 = Math.sin(i * angleIncrement);
            let x2 = Math.cos((i + 1) * angleIncrement);
            let y2 = Math.sin((i + 1) * angleIncrement);
            
            for (let j = 0 ; j < this.stacks ; j++) {
                let x = Math.cos((i + 0.5) * angleIncrement);
                let y = Math.sin((i + 0.5) * angleIncrement);
                let size = Math.sqrt(x * x + y * y);

                this.vertices.push(x1, y1, stackIncrement * j, x2, y2, stackIncrement * j, x1, y1, stackIncrement * (j + 1), x2, y2, stackIncrement * (j + 1));
                this.indices.push(index + 2, index, index + 1, index + 1, index + 3, index + 2);
                this.normals.push(x / size, y / size, 0, x / size, y / size, 0, x / size, y / size, 0, x / size, y / size, 0);
                index += 4;
            }
        }

        this.primitiveType = this.scene.gl.TRIANGLES;
        this.initGLBuffers();
    }
}