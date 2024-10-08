import { CGFobject, CGFappearance, CGFtexture } from '../../lib/CGF.js';
/**
 * MyPrism
 * @constructor
 * @param scene - Reference to MyScene object
 * @param slices - Number of slices
 * @param stacks - Number of stacks
 * @param texture - Texture
 * @param isInverted - If the prism is inverted
 * @param applyTexture - If the prism should be textured
 */
export class MySphere extends CGFobject {
    constructor(scene, slices, stacks, texture, isInverted, applyTexture = true) 
	{
        super(scene);
        this.slices = slices;
        this.stacks = stacks;
        this.texture = texture;
        this.isInverted = isInverted;
        this.applyTexture = applyTexture;

        this.appearance = new CGFappearance(this.scene);
        this.appearance.setTexture(this.texture);
        this.appearance.setTextureWrap('REPEAT', 'REPEAT');
        this.appearance.setAmbient(1, 1, 1, 1);
        this.appearance.setDiffuse(1, 1, 1, 1);
        this.appearance.setSpecular(1, 1, 1, 1);
        this.appearance.setShininess(10.0);

        this.initBuffers();
    }

   initBuffers() {
    this.vertices = [];
    this.indices = [];
    this.normals = [];
    this.texCoords = [];

    let flag = this.isInverted;

    for(let stack = 0; stack <= this.stacks; stack++) {
        let alpha = stack * Math.PI / this.stacks - Math.PI / 2;

        for(let slice = 0; slice <= this.slices; slice++) {
            let beta = slice * 2 * Math.PI / this.slices;

            let radius = Math.cos(alpha); // controls radius

            this.vertices.push(
                Math.cos(beta) * radius,
                Math.sin(alpha),
                Math.sin(beta) * radius
            );

            if(this.applyTexture) {
                if (flag) {
                    this.normals.push(
                        -Math.cos(beta) * radius,
                        -Math.sin(alpha),
                        -Math.sin(beta) * radius
                    );
                } else {
                    this.normals.push(
                        Math.cos(beta) * radius,
                        Math.sin(alpha),
                        Math.sin(beta) * radius
                    );
                }

                this.texCoords.push(
                    -slice / this.slices,
                    -(alpha + Math.PI / 2) / Math.PI
                );
            }
            else {
                this.normals.push(
                    Math.cos(beta) * radius,
                    Math.sin(alpha),
                    Math.sin(beta) * radius
                );

            }

        }
    } 


    if(flag == true) {
        for(let stack = 0; stack < this.stacks; stack++) {
            for(let slice = 0; slice < this.slices; slice++) {
                let first = (stack * (this.slices + 1)) + slice;
                let second = first + this.slices + 1;

                this.indices.push(first, first + 1, second);
                this.indices.push(second, first + 1, second + 1);
            }
        }
    } else {
        for(let stack = 0; stack < this.stacks; stack++) {
            for(let slice = 0; slice < this.slices; slice++) {
                let first = (stack * (this.slices + 1)) + slice;
                let second = first + this.slices + 1;

                this.indices.push(second, first + 1, first);
                this.indices.push(second + 1, first + 1, second);
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
            this.scene.setAmbient(1, 1, 1, 1);
            this.scene.setDiffuse(1, 1, 1, 1);
            this.scene.setSpecular(1, 1, 1, 1);
            this.scene.setShininess(10.0);
        }
        super.display();
        this.scene.popMatrix();
    }
}
