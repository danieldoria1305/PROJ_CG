import { CGFobject, CGFappearance, CGFtexture } from '../../lib/CGF.js';
/**
 * MyTriangle
 * @constructor
 * @param scene - Reference to MyScene object
 * @param color - Color of the triangle
 * @param texture - Texture
 */
export class MyTriangle extends CGFobject {
    constructor(scene, color, texture) {
        super(scene);
        this.texture = texture;
        this.color = color;
        this.appearance = new CGFappearance(this.scene);
        this.appearance.setTexture(this.texture);
        this.appearance.setTextureWrap('REPEAT', 'REPEAT');
        this.initBuffers();
    }

    initBuffers() {
        this.vertices = [
            -0.5, 0, 0,
            0.5, 0, 0,
            0, 0, -1.5
        ];

        this.normals = [
            0, 1, 0,
            0, 1, 0,
            0, 1, 0
        ];

        this.indices = [
            0, 1, 2,
            2, 1, 0
        ];

        this.texCoords = [
            0, 1,  
            1, 1,  
            0.5, 0
        ];
        
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