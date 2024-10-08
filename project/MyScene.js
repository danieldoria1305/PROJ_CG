import { CGFscene, CGFcamera, CGFaxis, CGFappearance, CGFshader, CGFtexture } from "../lib/CGF.js";
import { MyInterface } from "./MyInterface.js";
import { MyPanorama } from "./MyPanorama.js";
import { MyPlane } from "./MyPlane.js";
import { MyGarden } from "./objects/garden/MyGarden.js";
import { MyBee} from "./objects/bee/MyBee.js";
import { MyRockSet } from "./objects/rock/MyRockSet.js";
import { MyGrass } from "./objects/grass/MyGrass.js";
import { MyGrassField } from "./objects/grass/MyGrassField.js";

/**
 * MyScene
 * @constructor
 */
export class MyScene extends CGFscene {
  constructor() {
    super();
    // Variables to control speed and scale
    this.speedFactor = 1;
    this.scaleFactor = 1;

    this.windFactor = 15;

    // Flags to control display of axis and normals
    this.displayAxis = false;
    this.displayNormals = false;
  }

  // Method to initialize the scene
  init(application) {
    super.init(application);
    
    // Initialize cameras and lights
    this.initCameras();
    this.initLights();

    //Background color
    this.gl.clearColor(0.0, 0.0, 0.0, 1.0);
    this.gl.clearDepth(100.0);
    this.gl.enable(this.gl.DEPTH_TEST);
    this.gl.enable(this.gl.CULL_FACE);
    this.gl.depthFunc(this.gl.LEQUAL);

    //Objects connected to MyInterface
    this.gui = new MyInterface();
    
    this.gardenRows = 5;
    this.gardenColumns = 5;

    //Initialize scene objects
    this.axis = new CGFaxis(this);
    this.plane = new MyPlane(this,30);
    this.panorama = new MyPanorama(this, new CGFtexture(this, "images/panorama4.jpg"), true);
    this.garden = new MyGarden(this, this.gardenRows, this.gardenColumns);
    this.rockSet = new MyRockSet(this, 4);
    this.bee = new MyBee(this);
    this.grass = new MyGrass(this);
    this.grassField = new MyGrassField(this);

    this.enableTextures(true);

     // Load and apply texture to the plane
    this.texture = new CGFtexture(this, "images/terrain2.jpg");
    this.appearance = new CGFappearance(this);
    this.appearance.setTexture(this.texture);
    this.appearance.setTextureWrap('REPEAT', 'REPEAT');

  }

  // Method to initialize lights
  initLights() {
    this.lights[0].setPosition(15, 0, 5, 1);
    this.lights[0].setDiffuse(1.0, 1.0, 1.0, 1.0);
    this.lights[0].enable();
    this.lights[0].update();
  }

  // Method to initialize cameras
  initCameras() {
    this.camera = new CGFcamera(
      1.0,
      0.1,
      1000,
      vec3.fromValues(50, 10, 15),
      vec3.fromValues(0, 0, 0)
    );
  }

  // Method to set default material appearance
  setDefaultAppearance() {
    this.setAmbient(0.2, 0.4, 0.8, 1.0);
    this.setDiffuse(0.2, 0.4, 0.8, 1.0);
    this.setSpecular(0.2, 0.4, 0.8, 1.0);
    this.setShininess(10.0);
  }

  // Method to update garden
  updateGarden() {
    this.garden = new MyGarden(this, this.gardenRows, this.gardenColumns);
  }

   // Method to check keyboard inputs
  checkKeys() {
    let keysPressed = false;
    let text = "Keys pressed: ";
  
    // If W or w is pressed and if so, accelerate
    if (this.gui.isKeyPressed("KeyW")) {
      this.bee.accelerate(0.1 * this.speedFactor);
      text += " W ";
      keysPressed = true;
  }

  // If S or s is pressed and if so, decelerate
  if (this.gui.isKeyPressed("KeyS")) {
      this.bee.accelerate(-0.1 * this.speedFactor);
      text += " S ";
      keysPressed = true;
  }
  
  // If A or a is pressed and if so, turn left
  if (this.gui.isKeyPressed("KeyA")) {
      this.bee.turn(4 * this.speedFactor);
      text += " A ";
      keysPressed = true;
  }
  
  // If D or d is pressed and if so, turn right
  if (this.gui.isKeyPressed("KeyD")) {
      this.bee.turn(-4 * this.speedFactor);
      text += " D ";
      keysPressed = true;
  }

  // If F or f is pressed and if so, descend
  if(this.gui.isKeyPressed("KeyF")) {
      this.bee.descend(0.1 * this.speedFactor);
      text += " F ";
      keysPressed = true;
  
   /* for(let i = 0; i < this.garden.flowers.rows; i++) {
      for(let j = 0; j < this.garden.flowers.columns; j++) {
        const posX = j * 10.5 + 15;
        const posY = i * 10.5 + 15;
        if(this.bee.position.x == posX+2 || this.bee.position.x == posX-2) {
          if(this.bee.position.z == posY+2 || this.bee.position.z == posY-2) {
            if(this.bee.position.y == -110) {
              this.bee.collectPollen();
              this.garden.flowers[j*i].pollen.texCoords
        }
        }
      }
    }
  }*/
}

  // If P or p is pressed and if so, ascend
  if(this.gui.isKeyPressed("KeyP")) {
      this.bee.ascend(0.1 * this.speedFactor);
      text += " P ";
      keysPressed = true;
      /*if (this.bee.pollen && !this.bee.collectingPollen) {
        this.hive.addPollen(this.bee.pollen);
        this.bee.pollen = null;
    }*/
  }

  /*if (this.gui.isKeyPressed("KeyO")) {
    // Larga o pólen na entrada da colmeia
    if (this.bee.pollen && !this.bee.collectingPollen) {
        this.hive.addPollenEntrance(this.bee.pollen);
        this.bee.pollen = null;
    }
  }*/


  // If both F and P are pressed, it stops ascending or descending
  if(this.gui.isKeyPressed("KeyF") && this.gui.isKeyPressed("KeyP")) {
      this.bee.ascend(0* this.speedFactor);
      this.bee.descend(0* this.speedFactor);
      this.bee.height_speed = 0;
      text += " FP ";
      keysPressed = true;
  }
  

  // Check if R or r is pressed
  if (this.gui.isKeyPressed("KeyR")) {
      this.bee.reset();
      text += " R ";
      keysPressed = true;
  }
  
    // Print the letter pressed in the console
    if (keysPressed)
      console.log(text);
  
  }
  
  // Method to update scene with the bee movement and the field of grass wind
  update() {
    this.checkKeys();
    this.bee.update(this.speedFactor);
    this.grassField.update(this.windFactor);
  }
  
  
  // Method to display the scene
  display() {
    this.gl.blendFunc(this.gl.SRC_ALPHA, this.gl.ONE_MINUS_SRC_ALPHA);
    this.gl.enable(this.gl.BLEND);

    // ---- BEGIN Background, camera and axis setup
    // Clear image and depth buffer everytime we update the scene
    this.gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height);
    this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
    // Initialize Model-View matrix as identity (no transformation
    this.updateProjectionMatrix();
    this.loadIdentity();
    // Apply transformations corresponding to the camera position relative to the origin
    this.applyViewMatrix();

    // Draw axis
    if (this.displayAxis) this.axis.display();

    this.update();

    if(this.displayNormals) {this.panorama.enableNormalViz(); }
    else { this.panorama.disableNormalViz(); }

    // ---- BEGIN Primitive drawing section

    this.pushMatrix();
    this.appearance.apply();
    this.translate(0,-10,0);
    this.scale(400,400,400);
    this.rotate(-Math.PI/2.0,1,0,0);
    this.plane.display();
    this.popMatrix();

    this.panorama.display();
    
    this.rockSet.display();

    this.garden.display();
    
    this.bee.display();

    this.grassField.display();

    // ---- END Primitive drawing section
  }
}
