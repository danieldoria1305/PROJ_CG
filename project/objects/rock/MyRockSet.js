import { CGFobject, CGFappearance, CGFtexture } from '../../../lib/CGF.js';
import { MyRock } from './MyRock.js';
import { MyHive } from './MyHive.js';

/**
 * MyRockSet
 * @constructor
 * @param scene - Reference to MyScene object
 * @param numRocks - Number of rocks
 */

class MyRockSet extends CGFobject {
    constructor(scene, numRocks = 5) {
        super(scene);
        this.rocks = [];
        this.numRocks = numRocks;

        this.hive = new MyHive(scene);

        this.texture = new CGFtexture(scene, "images/rock.jpg");

        for (let i = 0; i < this.numRocks; i++) {
            this.rocks.push(new MyRock(scene, 10, 10, this.texture, false));
        }

        for (let i = 0; i < this.numRocks; i++) {
            let randomHeight = Math.random() * 2 + 2;
            let randomX = Math.random() * 2 + 2;
            let randomZ = Math.random() * 2 + 2;
            this.rocks[i].transform = { randomX, height: randomHeight, randomZ };
        }
    }

    // display rocks 
    display() {
        let stackHeight = 0;
        for (let i = 0; i < this.rocks.length; i++) {
            this.scene.pushMatrix();
            let { randomX, height, randomZ } = this.rocks[i].transform;
            this.scene.translate(-15, stackHeight + height - 10, -15);
            this.scene.scale(randomX, height, randomZ);
            this.rocks[i].display();
            this.scene.popMatrix();

            stackHeight += 2 * height;
        }

        this.scene.pushMatrix();
        this.scene.translate(-15, stackHeight - 9.3, -15);
        this.hive.display();
        this.scene.popMatrix();
    }

    // get final stack height
    getFinalStackHeight() {
        let totalHeight = 0;
        for (let i = 0; i < this.rocks.length; i++) {
            totalHeight += this.rocks[i].transform.height;
        }
        return totalHeight;
    }
}

export { MyRockSet };