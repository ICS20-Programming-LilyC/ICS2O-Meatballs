/* global Phaser */

// Copyright (c) 2020 Mr. Coxall All rights reserved
//
// Edited by: Lily Carroll
// Edited on: 06/1/2023
// This is the menu scene file

// Adding a class to the Menu Scene.
class MenuScene extends Phaser.Scene {
  // Constructor for the menu scene.
  constructor() {
    super({ key: "menuScene" });

    this.menuSceneBackgroundImage = null;
    this.startButton = null;
  }

  // Initializing menu scene.
  init(data) {
    this.cameras.main.setBackgroundColor("5a189a");
  }

  // Log menu scene during preload phase.
  preload() {
    console.log("Menu Scene");
    this.load.image("menuSceneBackground", "images/purpleStormStartingScreen.png");
    this.load.image("startButton", "images/startButton.png");
  }

  // Creating data objects.
  create(data) {
    this.menuSceneBackgroundImage = this.add.sprite(0, 0, "menuSceneBackground").setScale(2.75);
    this.menuSceneBackgroundImage.x = 1920 / 2;
    this.menuSceneBackgroundImage.y = 1080 / 2;

    this.startButton = this.add.sprite(1920 / 2, (1080 / 2) + 200, "startButton").setScale(2.4);
    this.startButton.setInteractive({ useHandCursor: true });
    this.startButton.on("pointerdown", this.clickButton, this);
  }

  clickButton() {
    this.scene.start("gameScene");
  }
}

// Exporting the menu scene as default.
export default MenuScene;
