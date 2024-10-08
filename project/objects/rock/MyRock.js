import { CGFobject, CGFappearance, CGFtexture } from '../../../lib/CGF.js';

/**
 * MyRock
 * @constructor
 * @param scene - Reference to MyScene object
 * @param slices - number of divisions around the Y axis
 * @param stacks - number of divisions along the Y axis
 * @param texture - texture
 * @param isInverted - true if the rock is inverted
 * @param applyTexture - true if the rock should be textured
 */
export class MyRock extends CGFobject {
    constructor(scene, slices, stacks, texture, isInverted, applyTexture = true) {
        super(scene);
        this.slices = slices;
        this.stacks = stacks;
        this.texture = texture;
        this.isInverted = isInverted;
        this.applyTexture = applyTexture;

        this.appearance = new CGFappearance(this.scene);
        this.appearance.setTexture(this.texture);
        this.appearance.setTextureWrap('REPEAT', 'REPEAT');

        this.initBuffers();
    }

    initBuffers() {
        this.vertices = [];
        this.indices = [];
        this.normals = [];
        this.texCoords = [];
    
        let flag = this.isInverted;

        for(let stack = 0; stack <= this.stacks; stack++) {
            let firstVertexOfStack = null;
            let firstNormalOfStack = null;

            for(let slice = 0; slice <= this.slices; slice++) {
                if(slice === this.slices) {
                    // Push the first vertex of the stack
                    this.vertices.push(...firstVertexOfStack);
                    this.normals.push(...firstNormalOfStack);
                } else {
                    let alpha = stack * Math.PI / this.stacks - Math.PI / 2;
                    let beta = slice * 2 * Math.PI / this.slices;
                    let radius = Math.cos(alpha); 

                    let normal = [
                        Math.cos(beta) * radius,
                        Math.sin(alpha),
                        Math.sin(beta) * radius
                    ];

                    let offset = Math.random() * 0.5;

                    let x = normal[0] * (1 + offset);
                    let y = normal[1] * (1 + offset);
                    let z = normal[2] * (1 + offset);

                    if(slice === 0) {
                        firstVertexOfStack = [x, y, z];
                        firstNormalOfStack = normal;
                    }

                    this.vertices.push(x, y, z);

                    if(this.applyTexture) {
                    if (flag) {
                        this.normals.push(-normal[0], -normal[1], -normal[2]);
                    } else {
                        this.normals.push(normal[0], normal[1], normal[2]);
                    }
                    this.texCoords.push(-slice / this.slices, -(alpha + Math.PI / 2) / Math.PI);
                } else {
                    this.normals.push(normal[0], normal[1], normal[2]);
                }
            }
        }

        if(flag) {
            for(let stack = 0; stack < this.stacks; stack++) {
                for(let slice = 0; slice < this.slices; slice++) {
                    let first = (stack * (this.slices + 1)) + slice;
                    let second = first + this.slices + 1;

                    this.indices.push(first, first + 1, second);
                    this.indices.push(first + 1, second + 1, second);
                }
            }
        } else {
            for(let stack = 0; stack < this.stacks; stack++) {
                for(let slice = 0; slice < this.slices; slice++) {
                    let first = (stack * (this.slices + 1)) + slice;
                    let second = first + this.slices + 1;

                    this.indices.push(first, second, first + 1);
                    this.indices.push(second, second + 1, first + 1);
                }
            }
        }
    }


        this.primitiveType = this.scene.gl.TRIANGLES;
        this.initGLBuffers();
        this.initNormalVizBuffers();
    }

    display() {
        this.scene.pushMatrix();
        if (this.applyTexture) {
            this.appearance.apply();
        }
        else {
            this.scene.setAmbient(1, 1, 0, 1);
            this.scene.setDiffuse(1, 1, 0, 1);
            this.scene.setSpecular(1, 1, 0, 1);

            this.scene.setShininess(10.0);
        }

        super.display();
        this.scene.popMatrix();
    }
}
