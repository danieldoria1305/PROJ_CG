import { CGFobject, CGFtexture, CGFappearance } from "../../lib/CGF.js";
/**
* MyCone
* @constructor
 * @param scene - Reference to MyScene object
 * @param slices - number of divisions around the Y axis
 * @param stacks - number of divisions along the Y axis
 * @param color - color of the cone
 * @param texture - texture
*/
export class MyCone extends CGFobject {
    constructor(scene, slices, stacks, color, texture) {
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
    
        var ang = 0;
        var alphaAng = 2*Math.PI/this.slices;
    
        for(var i = 0; i < this.slices; i++){
    
            this.vertices.push(Math.cos(ang), 0, -Math.sin(ang)); // controls radius
            this.indices.push(this.slices,  (i+1) % this.slices, i);
            this.normals.push(Math.cos(ang), Math.cos(Math.PI/4.0), -Math.sin(ang));
    
            // Add texture coordinates for each vertex
            this.texCoords.push(i / this.slices, 1);
    
            ang+=alphaAng;
        }
        this.vertices.push(0,1,0);
        this.normals.push(0,1,0);
    
        // Add texture coordinates for the top of the cone
        this.texCoords.push(0.5, 0);
    
        this.primitiveType = this.scene.gl.TRIANGLES;
        this.initGLBuffers();
    }

    /**
     * Called when user interacts with GUI to change object's complexity.
     * @param {integer} complexity - changes number of slices
     */
    updateBuffers(complexity){
        this.slices = 3 + Math.round(9 * complexity); //complexity varies 0-1, so slices varies 3-12

        // reinitialize buffers
        this.initBuffers();
        this.initNormalVizBuffers();
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


