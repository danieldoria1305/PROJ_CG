import { CGFobject, CGFappearance, CGFtexture } from '../../../lib/CGF.js';

/**
 * MyWing
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyWing extends CGFobject {
    constructor(scene, slices, radius, texture = null) {
        super(scene);
        this.slices = slices;
        this.radius = radius;
        this.texture = texture;

        this.appearance = new CGFappearance(this.scene);
        this.appearance.setTexture(this.texture);
        this.appearance.setTextureWrap('REPEAT', 'REPEAT');
        this.appearance.setAmbient(1, 1, 1, 0.3);
        this.appearance.setDiffuse(1, 1, 1, 0);
        this.appearance.setSpecular(1, 1, 1, 0);
        this.appearance.setEmission(0.1, 0.1, 0.1, 0);
        this.appearance.setShininess(10.0);

        this.initBuffers();
    }

    initBuffers() {
        this.vertices = [];
        this.indices = [];
        this.normals = [];
        this.texCoords = [];

        // Add center vertex
        this.vertices.push(0, 0, 0);
        this.normals.push(0, 0, 1);
        this.texCoords.push(0.5, 0.5);

        for (let slice = 0; slice <= this.slices; slice++) {
            let angle = (slice * 2 * Math.PI) / this.slices;
            let x = Math.cos(angle) * this.radius;
            let z = Math.sin(angle) * this.radius;

            this.vertices.push(x, 0, z);
            this.normals.push(0, 1, 0);
            this.texCoords.push(
                0.5 + Math.cos(angle) * 0.5,
                0.5 + Math.sin(angle) * 0.5
            );
        }

        for (let slice = 0; slice < this.slices; slice++) {
            this.indices.push(0, slice + 1, slice + 2);
        }

        this.primitiveType = this.scene.gl.TRIANGLES;
        this.initGLBuffers();
    }

    display() {
        this.scene.pushMatrix();
        this.appearance.apply();
        this.scene.gl.disable(this.scene.gl.CULL_FACE);
        this.scene.translate(0.6, 0, 0);
        this.scene.rotate(Math.PI / 2, 0, 1, 0);
        this.scene.scale(0.25, 0.5, 0.7);
        super.display();
        this.scene.gl.enable(this.scene.gl.CULL_FACE);
        this.scene.popMatrix();
    }
}
