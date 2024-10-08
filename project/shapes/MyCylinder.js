import { CGFobject, CGFtexture, CGFappearance } from '../../lib/CGF.js';
/**
 * MyCylinder
 * @constructor
 * @param scene - Reference to MyScene object
 * @param slices - Number of slices
 * @param stacks - Number of stacks
 * @param texture - Texture
 * @param color - Color
 */
export class MyCylinder extends CGFobject {
    constructor(scene, slices, stacks, texture, color) 
	{
        super(scene);
        this.slices = slices;
        this.stacks = stacks;
        this.texture = texture;
        this.color = color;
        this.appearance = new CGFappearance(this.scene);
        this.appearance.setTexture(this.texture);
        this.appearance.setTextureWrap('REPEAT', 'REPEAT');
        this.initBuffers();
    }

    initBuffers() {
        this.vertices = [];
        this.indices = [];
        this.normals = [];
        this.texCoords = []; // Add this line
    
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
    
                // Add texture coordinates for each vertex
                this.texCoords.push(i / this.slices, j / this.stacks, (i + 1) / this.slices, j / this.stacks, i / this.slices, (j + 1) / this.stacks, (i + 1) / this.slices, (j + 1) / this.stacks);
    
                index += 4;
            }
        }
    
        this.primitiveType = this.scene.gl.TRIANGLES;
        this.initGLBuffers();
    }

    display() {
        this.scene.pushMatrix();        
        this.appearance.setDiffuse(this.color[0], this.color[1], this.color[2], this.color[3]);
        this.appearance.setAmbient(this.color[0], this.color[1], this.color[2], this.color[3]);
        this.appearance.setSpecular(this.color[0], this.color[1], this.color[2], this.color[3]);
        this.appearance.setShininess(10);
        this.appearance.apply();
        super.display();
        this.scene.popMatrix();
    }
}