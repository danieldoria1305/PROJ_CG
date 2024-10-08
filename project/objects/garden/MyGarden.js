import { MyFlower } from './MyFlower.js';

/**
 * MyGarden
 * @constructor
 * @param scene - Reference to MyScene object
 * @param rows - Number of rows
 * @param cols - Number of columns
 */
export class MyGarden {
    constructor(scene, rows, cols) {
        this.scene = scene;
        this.rows = rows;
        this.cols = cols;
        this.flowers = [];
        this.randomInteger = []; // random integer for each flower
        this.randomPositions = []; // random position for each flower

        // initialize flowers
        for (let i = 0; i < this.rows * this.cols; i++) {
            let flower = new MyFlower(this.scene); 
            this.flowers.push(flower); 

            let randomNr = Math.floor(Math.random() * 5) + 3;
            this.randomInteger.push(randomNr+4);

            let randomPosition = Math.floor(Math.random() * 10) + 1;
            this.randomPositions.push(randomPosition);
        }

    }

    display() {
        const spacing = 10.5;
    
        for (let row = 0; row < this.rows; row++) {
            for (let col = 0; col < this.cols; col++) {
                const index = row * this.cols + col;
                const flower = this.flowers[index];
                const randomNr = this.randomInteger[index];
    
                const posX = col * spacing;
                const posY = row * spacing;
    
                this.scene.pushMatrix();
                this.scene.translate(posX + 15, -10, posY + 15);
                this.scene.scale(randomNr, randomNr, randomNr);
                flower.display();
                this.scene.popMatrix();
            }
        }
    }
}

