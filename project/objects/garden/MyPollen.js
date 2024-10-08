import { CGFobject, CGFappearance, CGFtexture } from '../../../lib/CGF.js';

/**
 * MyPollen
 * @constructor
 * @param scene - Reference to MyScene object
 * @param slices - Number of slices
 * @param stacks - Number of stacks
 * @param texture - Texture
 */
export class MyPollen extends CGFobject {
    constructor(scene, slices, stacks, texture) {
        super(scene);
        this.slices = slices;
        this.stacks = stacks;
        this.texture = texture;

        this.topScaleFactor = 1.5; 
        this.bottomScaleFactor = 0.8; 

        this.randomAngle = Math.random() * 2 * Math.PI;
        this.randomX = Math.random();
        this.randomY = Math.random();
        this.randomZ = Math.random();

        this.appearance = new CGFappearance(this.scene);
        this.appearance.setTexture(this.texture);
        this.appearance.setTextureWrap('REPEAT', 'REPEAT');
        this.appearance.setAmbient(1, 1, 0, 1);
        this.appearance.setDiffuse(1, 1, 0, 1);
        this.appearance.setSpecular(1, 1, 0, 1);
        this.appearance.setShininess(10);

        this.initBuffers();
    }

    initBuffers() {
        this.vertices = [];
        this.indices = [];
        this.normals = [];
        this.texCoords = [];

        for (let stack = 0; stack <= this.stacks; stack++) {
            let alpha = stack * Math.PI / this.stacks - Math.PI / 2;
            let scaleFactor = stack <= this.stacks / 2 ? this.topScaleFactor : this.bottomScaleFactor;

            for (let slice = 0; slice <= this.slices; slice++) {
                let beta = slice * 2 * Math.PI / this.slices;
                let radius = Math.cos(alpha);

                this.vertices.push(
                    Math.cos(beta) * radius,
                    Math.sin(alpha) * scaleFactor,
                    Math.sin(beta) * radius
                );

                this.normals.push(
                    Math.cos(beta) * radius,
                    Math.sin(alpha) * scaleFactor,
                    Math.sin(beta) * radius
                );

                this.texCoords.push(
                    slice / this.slices,
                    (alpha + Math.PI / 2) / Math.PI
                );
            }
        }

        for (let stack = 0; stack < this.stacks; stack++) {
            for (let slice = 0; slice < this.slices; slice++) {
                let first = (stack * (this.slices + 1)) + slice;
                let second = first + this.slices + 1;

                this.indices.push(second, first + 1, first);
                this.indices.push(second + 1, first + 1, second);
            }
        }

        this.primitiveType = this.scene.gl.TRIANGLES;
        this.initGLBuffers();
        this.initNormalVizBuffers();
    }

    display() {
        this.scene.pushMatrix();
        this.appearance.apply();
        //apply random rotation to the pollen in random axis
        this.scene.rotate(this.randomAngle, this.randomX, this.randomY, this.randomZ);
        super.display();
        this.scene.popMatrix();
    }
}
