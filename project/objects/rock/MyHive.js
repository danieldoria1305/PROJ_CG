import { CGFobject, CGFappearance, CGFtexture } from '../../../lib/CGF.js';
import { MyCylinder } from "../../shapes/MyCylinder.js";
import { MyCircle } from "../../shapes/MyCircle.js";

/**
 * MyHive
 * @constructor
 * @param scene - Reference to MyScene object
 */

export class MyHive extends CGFobject {
    constructor(scene) {
        super(scene);
        this.scene = scene;

        this.cylinder = new MyCylinder(scene, 10, 10, new CGFtexture(scene, "images/hive_walls.png"), [1, 1, 1, 1]);
        this.topSphere = new MyCircle(scene, 10, 10, new CGFtexture(scene, "images/hive_top.jpg"));
        this.bottomSphere = new MyCircle(scene, 10, 10, new CGFtexture(scene, "images/hive_top.jpg"));
    }

    display() {
        this.scene.pushMatrix();
        this.scene.rotate(-Math.PI / 2, 1, 0, 0);
        this.scene.scale(1, 1, 2.5);
        this.cylinder.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(0, 2.5, 0);
        this.scene.rotate(Math.PI, 1, 0, 0);
        this.scene.scale(0.1, 0.1, 0.1);
        this.topSphere.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.scale(0.1, 0.1, 0.1);
        this.bottomSphere.display();
        this.scene.popMatrix();
    }
}
