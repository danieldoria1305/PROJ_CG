import { CGFobject, CGFappearance, CGFtexture } from '../../../lib/CGF.js';
import { MyPetal } from './MyPetal.js';
import { MyReceptacle } from './MyReceptacle.js';
import { MyStem } from './MyStem.js';
import { MyPollen } from './MyPollen.js';

/**
 * MyFlower
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyFlower extends CGFobject {
  constructor(scene) {
    super(scene);
    // colors
    let green = [0, 1, 0, 1];
    let white = [1, 1, 1, 1];
    let blue = [0, 0, 1, 1];
    let red = [1, 0, 0, 1];
    let orange = [1, 0.5, 0, 1];
    let pink = [1, 0, 1, 1];
    let purple = [1, 0, 0.5, 1];
    let brown = [0.64, 0.16, 0.16, 1];

    // arrays of colours to randomly choose
    let colors = [green, white, blue, red, orange, pink, purple];

    let colors2 = [white, orange, brown];

    let petalColor = colors[Math.floor(Math.random() * colors.length)];
    this.petalNr = Math.floor(Math.random() * 7) + 5;

    let receptacleColor = colors2[Math.floor(Math.random() * colors2.length)];
    this.petals = [];

    let angleIncrement = (Math.PI * 2) / this.petalNr;

    this.petalTex = new CGFtexture(scene, "images/petal.jpg");

    for (let i = 0; i < this.petalNr; i++) {
      this.petals.push(new MyPetal(scene, petalColor, this.petalTex));
    }

    for (let i = 0; i < this.petals.length; i++) {
      let angle = i * angleIncrement;
      let xTranslation, zTranslation;

      zTranslation = Math.cos(angle) * -0.3;
      xTranslation = Math.sin(angle) * -0.3;
      
      this.petals[i].transform = { angle, xTranslation, zTranslation };
    }

    this.receptacleTex = new CGFtexture(scene, "images/receptacle.jpg");
    this.coneTex = new CGFtexture(scene, "images/stem.jpg");
    this.receptacle = new MyReceptacle(scene, green, receptacleColor, this.receptacleTex, this.coneTex);
    this.stem = new MyStem(scene, 10, 10, 0.04, 0.5, [0, 1, 0, 1]);

    this.pollenTex = new CGFtexture(scene, "images/pollen.jpg");
    this.pollen = new MyPollen(scene, 20, 20, this.pollenTex);
  }


  display() {
    this.scene.pushMatrix();
    this.receptacle.display();
    this.stem.display();
    this.scene.popMatrix();

    this.scene.pushMatrix();
    this.scene.translate(0, 0.72, 0);
    this.scene.scale(0.04, 0.04, 0.04);
    this.pollen.display();
    this.scene.popMatrix();

    for (let i = 0; i < this.petals.length; i++) {
      this.scene.pushMatrix();

      let { angle, xTranslation, zTranslation } = this.petals[i].transform;
      this.scene.translate(xTranslation, 0.565, zTranslation);
      this.scene.scale(0.15, 0.15, 0.15);
      this.scene.rotate(angle, 0, 1, 0);

      this.petals[i].display();

      this.scene.popMatrix();
    }
  }
}