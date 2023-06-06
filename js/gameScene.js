/* global Phaser */

// Copyright (c) 2020 Mr. Coxall All rights reserved
//
// Edited by: Lily Carroll
// Edited on: 06/1/2023
// This is the Phaser3 configuration file

// Adding a class to Game Scene.
class GameScene extends Phaser.Scene {
  // Constructor for the game scene.
  constructor() {
    super({ key: "gameScene" });
  
    this.background = null;
  }

  // Initializing game scene.
  init(data) {
    this.cameras.main.setBackgroundColor("669bbc");
  }

  // Log game scene during preload phase.
  preload() {
    console.log("Game Scene");

    //Images
    this.load.image("cityBackground", "images/cityAndTornadeoBackground.png");
  }

  // Creating data objects.
  create(data) {
    this.background = this.add.sprite(0, 0, "cityBackground").setScale(2.75);
    this.background.setOrigin(0, 0);
  }

  // Update the Game Scene.
  update(time, delta) {}

  clickButton() {
    this.scene.start("gameScene");
  }
}

// Exporting the game scene as default.
export default GameScene;