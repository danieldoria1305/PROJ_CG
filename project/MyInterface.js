import {CGFinterface, dat} from '../lib/CGF.js';

/**
* MyInterface
* @constructor
*/
export class MyInterface extends CGFinterface {
    constructor() {
        super();
    }

    init(application) {
        // call CGFinterface init
        super.init(application);
        
        // init GUI. For more information on the methods, check:
        // https://github.com/dataarts/dat.gui/blob/master/API.md
        this.gui = new dat.GUI();

        //Checkbox element in GUI
        this.gui.add(this.scene, 'displayAxis').name('Display Axis');
        this.gui.add(this.scene, 'displayNormals').name("Display Normals");

        //Slider elements in GUI
        this.gui.add(this.scene, 'gardenColumns', 1, 10).name('Garden Columns').step(1).onChange(this.scene.updateGarden.bind(this.scene));
        this.gui.add(this.scene, 'gardenRows', 1, 10).name('Garden Rows').step(1).onChange(this.scene.updateGarden.bind(this.scene));
        this.gui.add(this.scene, 'speedFactor', 0.1, 3).name('Speed Factor');
        this.gui.add(this.scene, 'scaleFactor', 0.5, 3).name('Scale Factor');

        this.initKeys();

        return true;
    }

    // Method that initializes keyboard keys
    initKeys() {
        this.scene.gui = this;
        this.processKeyboard = function() {};
        this.activeKeys = {};
    }

    // Function that processes key presses
    processKeyDown(event) {
        this.activeKeys[event.code] = true;
    }

    // Function that processes key releases
    processKeyUp(event) {
        this.activeKeys[event.code] = false;
    }

    // Function that checks whether a certain key is pressed
    isKeyPressed(keyCode) {
        return this.activeKeys[keyCode] || false;
    }

}