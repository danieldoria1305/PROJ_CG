import { CGFobject, CGFappearance } from '../../../lib/CGF.js';

/**
 * MyGrass
 * @constructor
 * @param scene - Reference to MyScene object
 * @param scale - Scale factor
 * @param orientation - Orientation
 */
export class MyGrass extends CGFobject {
  constructor(scene, scale, orientation) {
    super(scene);

    // Scale and speed factors
    this.scale = scale;
    this.orientation = orientation;
    this.speed = 2;

    // Wind angle and speed
    this.windAngle = 0;
    this.windSpeed = 5;

    // Material
    this.material = new CGFappearance(scene);
    this.material.setAmbient(0, 0.7, 0, 1);
    this.material.setDiffuse(0, 0.7, 0, 1);
    this.material.setSpecular(0, 0.7, 0, 1);
    this.material.setShininess(10.0);
    this.initBuffers();
  }

  initBuffers() {
    this.vertices = [
        0, 0, 0,
        0.5, 0, 0,
        0.0625, 0.75, 0,
        0.4375, 0.75, 0,
        0.125, 1.5, 0,
        0.375, 1.5, 0,
        0.1875, 2.25, 0,
        0.3125, 2.25, 0,
        0.25, 3, 0,
    ];

    this.indices = [
        0, 2, 3,
        3, 1, 0,
        2, 4, 5,
        5, 3, 2,
        4, 6, 7,
        7, 5, 4,
        6, 8, 7,
    ];

    this.normals = [];
    for (let i = 0; i < this.vertices.length; i++) {
      this.normals.push(0, 0, 1);
      this.normals.push(0, 0, -1);
    }

    this.primitiveType = this.scene.gl.TRIANGLES;

    this.originalVertices = this.vertices.slice();

    this.initGLBuffers();
  }

  update(windFactor) {
    let delta = 1 / 60;

    // Scale and speed factors
    this.scale = this.scene.scaleFactor;
    this.speed *= windFactor;

    if (this.speed > 0) {
      this.windAngle += this.windSpeed * delta;
      this.windAngle %= (2 * Math.PI); // Adjust the range of windAngle to [0, 2π)
    }
  }

  display() {
    let windFlap = Math.sin(this.windAngle) * 0.05;

    this.scene.pushMatrix();
    this.material.apply();

    // Rotate around the Y-axis
    this.scene.rotate(windFlap, 1, 0, 0);

    this.scene.gl.disable(this.scene.gl.CULL_FACE);
    super.display();
    this.scene.gl.enable(this.scene.gl.CULL_FACE);
    this.scene.popMatrix();
  }
}
