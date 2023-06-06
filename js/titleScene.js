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
    super({ key: "titleScene" })

    this.titleSceneBackgroundImage = null
    this.titleSceneText = null
    this.titleSceneTextStyle = { font: "200px Arial", fill: "#fde4b9", align: "center" }
  }

  // Initializing title scene.
  init(data) {
    this.cameras.main.setBackgroundColor("8d99ae")
  }

  // Log title scene during preload phase.
  preload() {
    console.log("Title Scene")
    this.load.image("titleSceneBackground", 'images/copVsMeatballsTitleScreen.png')
  }

// Creating data objects.
create(data) {
  this.titleSceneBackgroundImage = this.add.sprite(0, 0, "titleSceneBackground").setScale(2.75)
  this.titleSceneBackgroundImage.x = 1920 / 2
  this.titleSceneBackgroundImage.y = 1080 / 2

  // Display a welcome message.
  this.titleSceneText = this.add.text(1920 / 2, 100, "Cops VS meatballs", {
    fontSize: "48px",
    fontFamily: "Gerogia",
    color: "#000000",
    align: "center"
  }).setOrigin(0.5);

  // Slide in animation
  this.tweens.add({
    targets: this.titleSceneText,
    x: 1920 / 2,
    duration: 5000,
    ease: 'Power1',
    delay: 500
  });
}

  // Update the Title Scene.
  update(time, delta) {
    if (time > 9000) {
      this.scene.switch("menuScene")
    }
  }
}

// Exporting the title scene as default.
export default TitleScene;
