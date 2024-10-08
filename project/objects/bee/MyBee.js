import { CGFobject, CGFappearance, CGFtexture } from '../../../lib/CGF.js';
import { MyHead } from './MyHead.js';
import { MyBody } from './MyBody.js';
import { MyWing } from './MyWing.js';

/**
 * MyBee
 * @constructor
 * @param scene - Reference to MyScene object
 */

export class MyBee {
    constructor(scene) {
        this.scene = scene;

        // Initialize bee parts: head, body, wings
        this.head = new MyHead(scene);
        this.body = new MyBody(scene);
        
        this.wingTex = new CGFtexture(this.scene, 'images/wing.jpg');
        this.left_wing = new MyWing(scene, 20, 1, this.wingTex);
        this.right_wing = new MyWing(scene, 20, 1, this.wingTex);

        // Parameters to control bee movement and orientation
        this.scale = 1;
        this.speed = 0;
        this.orientation = 0;
        this.height_speed = 0;


        // Default and current positions of the bee
        this.defaultPosition = {x: 0, y: 0, z: 0};
        this.position = {x: 0, y: 0, z: 0};
        this.velocity = { x: 0, y: 0, z: 0 };

        // Parameters to control wing animation
        this.wingAngle = 0;
        this.wingFlapSpeed = 10;

        // Variables for pollen handling
        this.pollen = null; 
        this.collectingPollen = false; 
    }

    // Method to update bee position and wing animation
    update(speedFactor) {

        let delta = 1 / 60;

        this.position.x += this.velocity.x * delta;
        this.position.y += this.velocity.y * delta;
        this.position.z += this.velocity.z * delta;

        // Scale and speed factors
        this.scale = this.scene.scaleFactor;
        this.speed *= speedFactor;

        if (this.speed > 0 || this.height_speed > 0) {
            this.wingAngle += this.wingFlapSpeed * delta;
            this.wingAngle %=  Math.PI; 
        }

    }

    // Method to turn the bee
    turn(v) {
        this.orientation += v;
        const angle = this.orientation * Math.PI / 180;
        this.velocity.x = Math.sin(angle) * this.speed;
        this.velocity.z = Math.cos(angle) * this.speed;
    }

    // Method to accelerate the bee
    accelerate(v) {
        this.speed += v;
        if(this.speed < 0) this.speed = 0;
        const angle = this.orientation * Math.PI / 180;
        this.velocity.x = Math.sin(angle) * this.speed;
        this.velocity.z = Math.cos(angle) * this.speed;
    }

    // Method to ascend the bee
    ascend(v) {
            this.height_speed += v;
            this.velocity.y = this.height_speed;
    }

    // Method to descend the bee
    descend(v) {
            this.height_speed -= v;
            this.velocity.y = this.height_speed;
    }


    // Method to simulate collecting pollen
    collectPollen() {
        // Abelha coleta o pólen da flor
        if (!this.collectingPollen) {
            this.collectingPollen = true;
           // this.descend(0.1); // Desce até tocar a flor
        }
    }

    /*releasePollen() {
        // Abelha solta o pólen na entrada da colmeia
        if (this.collectingPollen) {
            this.collectingPollen = false;
            if (this.scene.hive) {
                this.scene.hive.addPollen(this.pollen); // Adiciona o pólen à colmeia
                this.pollen = null; // Remove a referência do pólen da abelha
            }
        }
    }*/

    // Method to reset bee's parameters
    reset() {
        this.position = { ...this.defaultPosition };
        this.orientation = 0;
        this.speed = 0;
        this.height_speed = 0;
        this.velocity = { x: 0, y: 0, z: 0 };
        this.wingAngle = 0;
        this.pollen = null;
        this.collectingPollen = false;
    }


    // Method to display the bee
    display() {

        this.scene.pushMatrix();
        this.scene.translate(this.position.x, this.position.y, this.position.z); 
        this.scene.rotate(this.orientation * Math.PI / 180, 0, 1, 0); 
        this.scene.scale(this.scale, this.scale, this.scale);

        this.scene.pushMatrix(); 
        this.head.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.body.display();
        this.scene.popMatrix();

        let wingFlap = Math.sin(this.wingAngle);

        // Display wings with or without wing flap animation based on speed
        if(this.speed == 0) {
            this.scene.pushMatrix();
            this.scene.translate(0.2, 0.96, 1.4);
            this.scene.rotate(Math.PI / 2.5, 0, 1, 0);
            this.left_wing.display();
            this.scene.popMatrix();

            this.scene.pushMatrix();
            this.scene.translate(-0.2, 0.96, 1.4);
            this.scene.rotate(Math.PI / 2 + Math.PI / 10, 0, 1, 0);
            this.right_wing.display();
            this.scene.popMatrix();
        }

        else {
            
            this.scene.pushMatrix();
            this.scene.translate(0.2, 0.96, 1.4);
            this.scene.rotate(wingFlap, 0, 0, 1);
            this.left_wing.display();
            this.scene.popMatrix();

            this.scene.pushMatrix();
            this.scene.translate(-0.2, 0.96, 1.4);
            this.scene.rotate(Math.PI, 0, 1, 0);
            this.scene.rotate(wingFlap, 0, 0, 1);
            this.right_wing.display();
            this.scene.popMatrix();
        }

        this.scene.popMatrix();

    }

}
