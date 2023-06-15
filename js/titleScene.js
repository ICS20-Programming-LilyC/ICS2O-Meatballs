/* global Phaser */

// Copyright (c) 2020 Mr. Coxall All rights reserved
//
// Edited by: Lily
// Edited on: 06/1/2023
// This is the title Scene file

// Adding a class to Title Scene.
class TitleScene extends Phaser.Scene {

  // Constructor for the title scene.
  constructor() {
    super({ key: "titleScene" });

    // Constructing background image.
    this.titleSceneBackgroundImage = null;

    // Constructing text.
    this.titleSceneText = null;

    // Constructing text style.
    this.titleSceneTextStyle = { font: "48px Georgia", fill: "#003049", align: "center" };
  }

  // Initializing title scene.
  init(data) {
    this.cameras.main.setBackgroundColor("8d99ae");
  }

  // Log title scene during preload phase.
  preload() {
    console.log("Title Scene");

    // Loading background image.
    this.load.image("titleSceneBackground", "images/copVsMeatballsTitleScreen.png");
  }

  // Creating data objects.
  create(data) {
    this.titleSceneBackgroundImage = this.add.sprite(0, 0, "titleSceneBackground").setScale(2.75);
    this.titleSceneBackgroundImage.x = 1920 / 2;
    this.titleSceneBackgroundImage.y = 1080 / 2;

    // Display an introduction message.
    this.titleSceneText = this.add.text(1920 / 2, (1080 / 2) - 450, "Are you ready for...", this.titleSceneTextStyle).setOrigin(0.5);
  }

  // Update the Title Scene.
  update(time, delta) {
    if (time > 9000) {
      this.scene.switch("menuScene");
    }
  }
}

// Exporting the title scene as default.
export default TitleScene;
