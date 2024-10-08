// MyGrassField.js
import { CGFobject, CGFappearance, CGFtexture } from '../../../lib/CGF.js';
import { MyGrass } from './MyGrass.js';

/**
 * MyGrassField
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyGrassField extends CGFobject {
  constructor(scene) {
    super(scene);

    this.grassList = [];
    this.initGrassField();
  }

  // Initializes the grass field
  initGrassField() {
    const fieldWidth = 50;
    const fieldHeight = 50;
    const spacing = 1;
    const minScale = 0.5; // Minimum scale for grass blades
    const maxScale = 1.5; // Maximum scale for grass blades

    // Generate grass objects
    for (let x = -fieldWidth / 2; x < fieldWidth / 2; x += spacing) {
      for (let z = -fieldHeight / 2; z < fieldHeight / 2; z += spacing) {
        const scale = minScale + Math.random() * (maxScale - minScale); // Random scale
        const orientation = Math.random() * 2 * Math.PI; // Random orientation
        const grass = new MyGrass(this.scene, scale, orientation);
        grass.translations = [x + 36, -10, z + 35];
        this.grassList.push(grass);
      }
    }
  }

  display() {
    this.grassList.forEach((grass) => {
      this.scene.pushMatrix();
      this.scene.translate(...grass.translations);
      this.scene.rotate(grass.orientation, 0, 1, 0); // Rotate around Y-axis
      this.scene.scale(grass.scale, grass.scale, grass.scale); // Apply scale
      grass.display();
      this.scene.popMatrix();
    });
  }

  // Method to update the wind factor
  update(windFactor) {
    this.grassList.forEach((grass) => {
      grass.update(windFactor);
    });
  }
}